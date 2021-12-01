import { Body, Controller, Headers, HostParam, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User, FirebaseUser } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { Stripe } from 'stripe';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import * as admin from 'firebase-admin';
import { UsersService } from 'src/users/users.service';

@Controller('store')
@ApiTags('store')
export class StoreController {

    private stripe: Stripe;

    constructor(private configService: ConfigService, private usersService: UsersService) {
        const apiKey = this.configService.get('stripe.privateKey')
        this.stripe = new Stripe(apiKey, { apiVersion: '2020-08-27' })
    }

    @Post('/create-checkout-session')
    @UseGuards(BearerGuard)
    @ApiBearerAuth('Bearer Authentication')
    @ApiBody({ type: CreateCheckoutSessionDto })
    async createCheckoutSession(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto, @User() user: FirebaseUser, @Headers() headers) {
        const origin = headers?.origin
        const product = await this.stripe.products.retrieve(createCheckoutSessionDto.productId, { expand: ['price'] })
        const price = await this.stripe.prices.list({ product: product.id })

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                quantity: 1,
                price: price.data[0].id
            }],
            success_url: `${origin}/success`,
            cancel_url: `${origin}/store`,
            customer_email: user.email,
            metadata: {
                productId: product.id
            }
        })
        return session
    }

    @Post('/webhook-stripe')
    async webhookStripe(@Headers('stripe-signature') stripeSignature, @Req() request: any) {
        const endpointSecret = this.configService.get('stripe.webhookEndpointSecret')

        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(request.rawBody, stripeSignature, endpointSecret);
        } catch (err) {
            throw new HttpException(`Webhook Error: ${err.message}`, 400);
        }
        switch (event.type) {
            case 'checkout.session.completed': {
                const eventObject: any = event.data.object;
                // Save an order in your database, marked as 'awaiting payment'
                // createOrder(session);

                // Check if the order is paid (e.g., from a card payment)
                //
                // A delayed notification payment will have an `unpaid` status, as
                // you're still waiting for funds to be transferred from the customer's
                // account.
                const isSessionPayed = eventObject.payment_status === 'paid'
                if (isSessionPayed) {
                    // Fullfill order
                    const session = await this.stripe.checkout.sessions.retrieve(eventObject.id)
                    const { uid } = await admin.auth().getUserByEmail(session.customer_email);
                    const productId = session.metadata.productId;
                    const product = await this.stripe.products.retrieve(productId);
                    const pointsToAdd = parseInt(product.metadata.points, 10) + parseInt(product.metadata.pointsBonus, 10)
                    await this.usersService.addRaceControlPoints(uid, pointsToAdd)
                }

                break;
            }
        }

    }

}
