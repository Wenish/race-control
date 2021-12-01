import { Body, Controller, Headers, HostParam, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User, FirebaseUser } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { Stripe } from 'stripe';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Controller('store')
@ApiTags('store')
export class StoreController {

    private stripe: Stripe;

    constructor(private configService: ConfigService) {
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
            customer_email: user.email
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
            console.log(err)
            throw new HttpException(`Webhook Error: ${err.message}`, 400);
        }

        let intent = null;
        switch (event.type) {
            case 'payment_intent.succeeded':
                intent = event.data.object;
                console.log(event.type)
                console.log("Succeeded:", intent.id);
                break;
        }

    }

}
