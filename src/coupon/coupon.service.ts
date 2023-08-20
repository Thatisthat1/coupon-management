import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './coupon.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}

  async generateCoupons(): Promise<void> {
    // create coupon 
    const coupons = new Array(10000).fill(0).map((_, index) => {
      const newCoupon = new Coupon()
      newCoupon.code = uuidv4()
      return newCoupon
    })
    //save coupon to database
    await this.couponModel.create(coupons)
  }

  async getCoupons(): Promise<Coupon[]> {
    //find the coupon that gen today
    return this.couponModel.find({ createdAt: new Date() });
  }

  async claimCoupon(code: string, userId: string): Promise<boolean> {
    //set coupon is claim
    try{
      await this.couponModel.updateOne(
        { code: code },
        { $set: { isRedeemed: true } },
      );

      //send email for user base on userId
    }catch(e) {
      return false
    }
  }
}
