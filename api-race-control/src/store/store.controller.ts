import { Body, Controller, Headers, HostParam, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User, FirebaseUser } from 'src/decorators/user.decorator';
import { BearerGuard } from 'src/guards/bearer.guard';
import { Stripe } from 'stripe';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Controller('store')
@ApiTags('store')
export class StoreController {

    constructor(private configService: ConfigService) {

    }

    @Post('/create-checkout-session')
    @UseGuards(BearerGuard)
    @ApiBearerAuth('Bearer Authentication')
    @ApiBody({ type: CreateCheckoutSessionDto })
    async createCheckoutSession(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto, @User() user: FirebaseUser, @Headers() headers) {
        const origin = headers?.origin
        const apiKey = this.configService.get('stripe.privateKey')
        const stripe = new Stripe(apiKey, { apiVersion: '2020-08-27' })
        const product = await stripe.products.retrieve(createCheckoutSessionDto.productId, { expand: ['price']})
        const price = await stripe.prices.list({product: product.id })

        const session = await stripe.checkout.sessions.create({
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
}
