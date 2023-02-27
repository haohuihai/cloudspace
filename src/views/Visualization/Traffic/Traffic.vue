<template>
  <div :style="{ visibility: isShowBox }" class="container-traffic">
    <div class="container-flex" tabindex="0" hidefocus="true">
      <div class="box-left">
        <div class="left-top">
          <div class="current-num">
            <div>当前到件量</div>
            <p>123,456,789</p>
          </div>
        </div>
        <div class="left-center">
          <div class="title-box">
            <h6>派件入库量占比</h6>
          </div>
          <div class="chart-box pie-chart">
            <Dispatch />
          </div>
        </div>
        <div class="left-bottom select">
          <div class="title-box">
            <h6>广东省寄派件数据</h6>
            <img class="line-img" src="@/assets/imgs/vision/line-blue.png" alt="" />
            <button id="filBtn"
              ><img src="@/assets/imgs/vision/select_icon.png" alt="" />筛选</button
            >
          </div>
          <div class="chart-box">
            <div class="filter-con" id="filCon" data-type="1">
              <div class="select" tabindex="0" hidefocus="true">
                <div class="select-div"> 派件 </div>
                <ul class="select-ul">
                  <li class="active" data-value="1">派件</li>
                  <li data-value="2">寄件</li>
                </ul>
              </div>
              <div class="select" tabindex="0" hidefocus="true">
                <div class="select-div"> 公司 </div>
                <ul class="select-ul company">
                  <li class="active" data-value="">公司</li>
                  <li data-value="1">顺丰</li>
                  <li data-value="2">京东</li>
                  <li data-value="2">EMS</li>
                </ul>
              </div>
              <div class="select" tabindex="0" hidefocus="true">
                <div class="select-div"> 快件类型 </div>
                <ul class="select-ul">
                  <li class="active" data-value="">快件类型</li>
                  <li data-value="0">文件</li>
                  <li data-value="1">物品</li>
                </ul>
              </div>
            </div>
            <GuangDong />
          </div>
        </div>
      </div>
      <div class="box-center">
        <div class="center-top">
          <h1>智慧物流服务中心</h1>
        </div>
        <div class="center-center">
          <div class="weather-box">
            <div class="data">
              <p class="time" id="time">00:00:00</p>
              <p id="date"></p>
            </div>
            <div class="weather">
              <img id="weatherImg" src="@/assets/imgs/vision/weather/weather_img01.png" alt="" />
              <div id="weather">
                <p class="active">多云</p>
                <p>16-22℃</p>
                <p>深圳市南山区</p>
              </div>
            </div>
          </div>
          <img src="@/assets/imgs/vision/line_bg.png" alt="" />
          <div class="select-box">
            <ul id="barType">
              <li class="active" data-value="1">派件</li>
              <li data-value="2">寄件</li>
            </ul>
            <div data-type="2">
              <div class="select" tabindex="0" hidefocus="true">
                <div class="select-div"> 公司 </div>
                <ul class="select-ul company">
                  <li class="active" data-value="">公司</li>
                  <li data-value="1">顺丰</li>
                  <li data-value="2">京东</li>
                  <li data-value="2">EMS</li>
                </ul>
              </div>
              <div class="select" tabindex="0" hidefocus="true">
                <div class="select-div"> 快件类型 </div>
                <ul class="select-ul">
                  <li class="active" data-value="">快件类型</li>
                  <li data-value="0">文件</li>
                  <li data-value="1">物品</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="center-bottom">
          <div class="chart-box">
            <China />
            <div id="chart4" style="width: 100%; height: 95%"></div>
          </div>
          <div class="city-data"> </div>
        </div>
      </div>
      <div class="box-right">
        <div class="right-top">
          <div class="title-box">
            <h6 id="barTitle">派件数据</h6>
            <img class="line-img" src="@/assets/imgs/vision/line-blue.png" alt="" />
            <button data-state="1" id="tabBtn"
              ><img src="@/assets/imgs/vision/chart_icon.png" alt="" /><span>图表</span></button
            >
          </div>
          <p class="unit">单位：件</p>
          <div class="chart-box">
            <DispatchBar />
          </div>
          <div class="data-box" style="display: none">
            <table class="table1">
              <tr>
                <td>入库件</td>
                <td colspan="3" class="table-data dph-data1">0</td>
              </tr>
              <tr class="bg-color">
                <td rowspan="2">在库件</td>
                <td rowspan="2" class="table-data dph-data2">0</td>
                <td>正常件</td>
                <td class="table-data dph-data3">0</td>
              </tr>
              <tr class="bg-color">
                <td>滞留件</td>
                <td class="table-data dph-data5">0</td>
              </tr>
              <tr>
                <td rowspan="2">出库件</td>
                <td rowspan="2" class="dph-data6">0</td>
                <td>派送件</td>
                <td class="table-data dph-data7">0</td>
              </tr>
              <tr>
                <td>自提件</td>
                <td class="table-data dph-data8">0</td>
              </tr>
              <tr class="bg-color">
                <td>退签件</td>
                <td colspan="3" class="table-data dph-data9">0</td>
              </tr>
              <tr>
                <td>丢失件</td>
                <td colspan="3" class="table-data dph-data4">0</td>
              </tr>
            </table>
            <table class="table1" style="display: none">
              <tr>
                <td>入库件</td>
                <td colspan="3" class="table-data mail-data1">1</td>
              </tr>
              <tr class="bg-color">
                <td rowspan="2">在库件</td>
                <td rowspan="2" class="table-data mail-data2">1</td>
                <td>正常件</td>
                <td class="table-data mail-data7">1</td>
              </tr>
              <tr class="bg-color">
                <td>滞留件</td>
                <td class="table-data mail-data4">1</td>
              </tr>

              <tr>
                <td>出库件</td>
                <td colspan="3" class="mail-data6">1</td>
              </tr>
              <tr class="bg-color">
                <td>丢失件</td>
                <td colspan="3" class="mail-data3">1</td>
              </tr>
              <tr>
                <td>撤销件</td>
                <td colspan="3" class="table-data mail-data5">1</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="right-center">
          <div class="title-box">
            <p id="switchBtn"
              ><span class="active" data-dataType="income">收入数据</span
              ><img class="line-img" src="@/assets/imgs/vision/line-blue.png" alt="" /><span
                data-dataType="expend"
                >支出数据</span
              ></p
            >
            <img class="line-img" src="@/assets/imgs/vision/line-blue.png" alt="" />
            <button id="dateBtn"
              ><img src="@/assets/imgs/vision/data_icon.png" alt="" />日期</button
            >
          </div>
          <div class="data-box">
            <p class="data-number" id="totalProfit">123,456.5元</p>
            <div class="time-box" id="timeBox">
              <div class="time-div">
                <input class="time-input" type="text" value="" id="startTime" />
                <img src="@/assets/imgs/vision/selsct_time.png" alt="" />
              </div>
              <div class="time-div end">
                <input class="time-input" type="text" value="" id="endTime" />
                <img src="@/assets/imgs/vision/selsct_time.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <div class="title-box">
            <button id="setBtn"
              ><img src="@/assets/imgs/vision/settings_icon.png" alt="" />设置</button
            >
          </div>
          <div class="data-box">
            <div class="settings-box">
              <p
                ><img src="@/assets/imgs/vision/teacher_icon.png" alt="" />今日值班：张三<span
                  id="name_a"
                ></span
                ><span id="date_a"></span
              ></p>
              <p
                ><img src="@/assets/imgs/vision/people_iocn.png" alt="" />负责人：王麻子<span
                  id="lea_a"
                ></span
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref, reactive } from 'vue'
import Dispatch from './components/Dispatch.vue'
import GuangDong from './components/GuangDong.vue'
import China from './components/China.vue'
import DispatchBar from './components/DispatchBar.vue'
let isShowBox = ref('hidden')

onMounted(() => {
  isShowBox.value = 'visible'
})
</script>
<style lang="less">
@import '../../../styles/vision.css';
</style>
