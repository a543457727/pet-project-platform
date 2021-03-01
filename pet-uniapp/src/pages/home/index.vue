<template>
  <div id="home">
    <div class="h-search">
      <u-search
        placeholder="请输入需要搜索的内容"
        v-model="keyword"
        border-color="orangered"
        :show-action="false"
      ></u-search>
    </div>
    <div class="h-swiper">
      <u-swiper :list="list"></u-swiper>
    </div>
    <div class="h-bd">
      <div class="shop-recommed">
        <u-waterfall v-model="shopRecommed">
          <template v-slot:left="{ leftList }">
            <view
              class="shop-warter"
              v-for="(item, index) in leftList"
              :key="index"
            >
              <u-lazy-load
                threshold="-450"
                border-radius="10"
                :image="item.image"
                :index="index"
              ></u-lazy-load>
              <view class="shop-title">
                {{ item.title }}
              </view>
              <view class="shop-price"> {{ item.price }}元 </view>
              <view class="shop-tag">
                <view class="shop-tag-owner"> 自营 </view>
                <view class="shop-tag-text"> 放心购 </view>
              </view>
              <view class="shop-name">
                {{ item.shop }}
              </view>
              <u-icon
                name="close-circle-fill"
                color="#fa3534"
                size="34"
                class="u-close"
                @click="remove(item.id)"
              ></u-icon>
            </view>
          </template>
          <template v-slot:right="{ rightList }">
            <view
              class="shop-warter"
              v-for="(item, index) in rightList"
              :key="index"
            >
              <u-lazy-load
                threshold="-450"
                border-radius="10"
                :image="item.image"
                :index="index"
              ></u-lazy-load>
              <view class="shop-title">
                {{ item.title }}
              </view>
              <view class="shop-price"> {{ item.price }}元 </view>
              <view class="shop-tag">
                <view class="shop-tag-owner"> 自营 </view>
                <view class="shop-tag-text"> 放心购 </view>
              </view>
              <view class="shop-name">
                {{ item.shop }}
              </view>
              <u-icon
                name="close-circle-fill"
                color="#fa3534"
                size="34"
                class="u-close"
                @click="remove(item.id)"
              ></u-icon>
            </view>
          </template>
        </u-waterfall>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          image: "https://cdn.uviewui.com/uview/swiper/1.jpg",
          title: "这里是广告位",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/2.jpg",
          title: "这里是广告位",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/3.jpg",
          title: "这里是广告位",
        },
      ],
      shopRecommed: [
        {
          price: 35,
          title: "北国风光，千里冰封，万里雪飘",
          shop: "李白杜甫白居易旗舰店",
          image:
            "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
        },
        {
          price: 75,
          title: "望长城内外，惟余莽莽",
          shop: "李白杜甫白居易旗舰店",
          image:
            "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg",
        },
        {
          price: 385,
          title: "大河上下，顿失滔滔",
          shop: "李白杜甫白居易旗舰店",
          image:
            "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
        },
        {
          price: 784,
          title: "欲与天公试比高",
          shop: "李白杜甫白居易旗舰店",
          image:
            "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg",
        },
        {
          price: 7891,
          title: "须晴日，看红装素裹，分外妖娆",
          shop: "李白杜甫白居易旗舰店",
          image:
            "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg",
        },
        {
          price: 2341,
          shop: "李白杜甫白居易旗舰店",
          title: "江山如此多娇，引无数英雄竞折腰",
          image:
            "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg",
        },
        {
          price: 661,
          shop: "李白杜甫白居易旗舰店",
          title: "惜秦皇汉武，略输文采",
          image:
            "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg",
        },
        {
          price: 1654,
          title: "唐宗宋祖，稍逊风骚",
          shop: "李白杜甫白居易旗舰店",
          image:
            "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg",
        },
        {
          price: 1678,
          title: "一代天骄，成吉思汗",
          shop: "李白杜甫白居易旗舰店",
          image:
            "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg",
        },
        {
          price: 924,
          title: "只识弯弓射大雕",
          shop: "李白杜甫白居易旗舰店",
          image:
            "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg",
        },
        {
          price: 8243,
          title: "俱往矣，数风流人物，还看今朝",
          shop: "李白杜甫白居易旗舰店",
          image:
            "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss">
#home {
  height: 100%;
  background-color: rgb(240, 240, 240);
  margin: 0 10rpx;
  overflow: hidden;
  .h-search {
    margin: 10rpx 0;
  }
  .h-bd {
    padding-top: 10rpx;
    background-color: rgb(240, 240, 240);
    .shop-recommed {
      .shop-warter {
        border-radius: 16rpx;
        margin: 15rpx;
        background-color: #ffffff;
        padding: 8px;
        position: relative;
        .u-close {
          position: absolute;
          top: 32rpx;
          right: 32rpx;
        }
        .demo-image {
          width: 100%;
          border-radius: 8rpx;
        }
        .shop-title {
          font-size: 30rpx;
          margin-top: 10rpx;
          color: $u-main-color;
        }
        .shop-tag {
          display: flex;
          margin-top: 10rpx;
          .shop-tag-owner {
            background-color: $u-type-error;
            color: #ffffff;
            display: flex;
            align-items: center;
            padding: 4rpx 14rpx;
            border-radius: 50rpx;
            font-size: 20rpx;
            line-height: 1;
          }
          .shop-tag-text {
            border: 1px solid $u-type-primary;
            color: $u-type-primary;
            margin-left: 10px;
            border-radius: 50rpx;
            line-height: 1;
            padding: 4rpx 14rpx;
            display: flex;
            align-items: center;
            border-radius: 50rpx;
            font-size: 20rpx;
          }
        }
        .shop-price {
          font-size: 30rpx;
          color: $u-type-error;
          margin-top: 10rpx;
        }

        .shop-name {
          font-size: 22rpx;
          color: $u-tips-color;
          margin-top: 10rpx;
        }
      }
    }
  }
}
</style>