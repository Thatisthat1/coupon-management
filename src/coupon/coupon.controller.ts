import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Coupon } from './coupon.model';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  async getCoupons(): Promise<Coupon[]> {
    return this.couponService.getCoupons()
  }

  @Post('claim/:code')
  async claimCoupon(@Param('code') code: string, @Body('userId') userId: string): Promise<any> {
    return this.couponService.claimCoupon(code, userId)
  }
}
