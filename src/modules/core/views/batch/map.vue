<template>
  <el-dialog
    :visible.sync="showmap"
    width="80%"
    :append-to-body="true"
    :before-close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div style="display: flex; margin-bottom: 15px">
      <el-input
        v-model="addressKeyword"
        placeholder="请输入地址来直接查找精确位置"
      ></el-input>
      <el-button type="primary" @click="getpoint" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <baidu-map
      :center="center"
      :zoom="zoom"
      @ready="handler"
      style="width: 100%; height: 500px"
      @click="getClickInfo"
      :scroll-wheel-zoom="true"
    >
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="false"
        :autoLocation="true"
        :locationIcon="{
          url: require('../../../../assets/image/location.png'),
          size: { width: 30, height: 30 },
        }"
      >
      </bm-geolocation>
      <bm-marker
        :position="center"
        :icon="{
          url: require('../../../../assets/image/location.png'),
          size: { width: 30, height: 30 },
        }"
      >
      </bm-marker>
      <bm-view style="width: 100%; height: 100%; flex: 1"></bm-view>
      <bn-local-search
        :keyword="addressKeyword"
        :auto-viewport="true"
        style="display: none"
      ></bn-local-search>
    </baidu-map>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showmap: Boolean,
    lat: {
      type: String,
      default: ''
    },
    lng: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      center: {lng:'', lat: ''},
      zoom: 3,
      addressKeyword:'',
      autoLocationPoint:'',
      initLocation:false,
    }
  },

  watch: {
    showmap(val) {
      this.center={lng:'', lat: ''}
      if (val) {
        this.center.lng=this.lng
        this.center.lat=this.lat
        this.zoom=15
        this.addressKeyword=''
      }
    },
  },
  methods: {
    handler ({BMap, map}) {
      console.log(8888)
      var point = new BMap.Point(this.center.lng, this.center.lat)
      map.centerAndZoom(point, 15)
      var marker = new BMap.Marker(point) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
      map.addOverlay(circle)
    },
    
    getClickInfo (e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
      let geoCoder=new BMap.Geocoder()
      // 根据坐标查位置
      geoCoder.getLocation(e.point,res=>{
        console.log(res)
      })

    },
    // 搜索地理位置
    getpoint(){
      let geoCoder=new BMap.Geocoder()
      // 根据位置查坐标
      geoCoder.getPoint(this.addressKeyword,point=>{
        this.center.lng=point.lng
        this.center.lat=point.lat
      })
    },
    
    close(flag) {
      this.model = this.$options.data().model
      this.$emit('closeMap', flag)
    }
  }
}
</script>
