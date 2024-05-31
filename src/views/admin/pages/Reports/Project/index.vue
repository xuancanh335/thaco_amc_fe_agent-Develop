<template lang="">
    <section>
        <div class="card card-one">   
            <Filters 
                :AdvancedFilter="true" 
                @handleFilter="setDataFilter" 
                ref="Filter" 
                :date_time="true"
                :ApplyFilter="['project_name','local','investor','tenant_used']"
            >
                <button @click="exportToExcel" class="btn btn-success d-flex align-items-center gap-2">
                    <IconTableExport :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                    <span>Xuất trang hiện tại</span>    
                </button>
                <button @click="exportAllToExcel" class="btn btn-primary text-white d-flex align-items-center gap-2">
                    <IconTableExport :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                    <span>Xuất tất cả dự liệu</span>    
                </button>
            </Filters>

            <div class="card-body p-3">
                <div :class="{'hide' : !preloader}" class="preloader position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light">
                    <img src="/assets/images/loading.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                    <h6 class="text-muted fw-light" style="margin-top:-40px">Đang tải dữ liệu...</h6>
                </div>
                <div class="h-scrollbar v-scrollbar table-responsive mb-3" style="max-height:80vh">
                     <table class="table-report-detail table table-sm table-hover table-bordered align-middle" style="width:520%;">
                        <thead class="bg-primary bg-opacity-10">
                            <tr>
                                <th class="align-middle text-center" style="width: 1%;" rowspan="2">STT</th>
                                <th class="align-middle text-center" style="width: 2%;" rowspan="2">Tỉnh/TP</th>
                                <th class="align-middle text-center" style="width: 2%;" rowspan="2">Quận/Huyện</th>
                                <th class="align-middle text-center" style="width: 6%;" rowspan="2">Địa chỉ thửa đất</th>
                                <th class="align-middle text-center" style="width: 2%;" rowspan="2">Tập đoàn</th>
                                <th class="align-middle text-center" style="width: 4%;" rowspan="2">Chủ sở hữu đất</th>
                                <th class="align-middle text-center" style="width: 4%;" rowspan="2">Chủ đầu tư</th>
                                <th class="align-middle text-center" style="width: 9%;" colspan="3">Đơn vị sử dụng</th>
                                <th class="align-middle text-center" style="width: 1.5%;" rowspan="2">Diện tích (m2)</th>
                                <th class="align-middle text-center" colspan="5">Thông tin chi tiết thửa đất</th>
                                <th class="align-middle text-center" rowspan="2" style="width: 4%;">Pháp lý đầu tư</th>
                                <th class="align-middle text-center" rowspan="2" style="width: 4%;">Pháp lý xây dựng</th>
                                <th class="align-middle text-center" rowspan="2" style="width: 4%;">Tình trạng \chứng nhận sở hữu công trình</th>
                                <th class="align-middle text-center" rowspan="2" style="width: 3%;">Tình trạng thế chấp</th>
                                <th class="align-middle text-center" rowspan="2" style="width: 3%;">Nơi lưu QSDĐ</th>
                                <th class="align-middle text-center" colspan="4">ĐỊNH GIÁ THỊ TRƯỜNG (ĐVT: Triệu đồng)</th>
                                <th class="align-middle text-center" colspan="2">Đề xuất</th>
                                <th class="align-middle text-center" colspan="2">Giá trị đầu tư</th>
                                <th class="align-middle text-center" colspan="2">Đã chi</th>
                                <th class="align-middle text-center" colspan="2">Còn lại</th>
                                <th class="align-middle text-center" style="width: 3%;" rowspan="2">Mã dự án</th>
                            </tr>
                            <tr>
                                <th class="align-middle text-center" style="width: 4%;">Tên Công ty sử dụng</th>
                                <th class="align-middle text-center" style="width: 4%;">Tên Quản trị</th>
                                <th class="align-middle text-center" style="width: 4%;">Dự án/Showroom</th>
                                <th class="align-middle text-center" style="width: 2%;">Mục đích sử dụng</th>
                                <th class="align-middle text-center" style="width: 2%;">Thời hạn sử dụng</th>
                                <th class="align-middle text-center" style="width: 4%;">Nguồn gốc đất (ghi nhận theo GCN QSDĐ)</th>
                                <th class="align-middle text-center" style="width: 4%;">Nguồn gốc tạo lập đất (theo thực tế)</th>
                                <th class="align-middle text-center" style="width: 4%;">Thông tin quy hoạch</th>
                                <th class="align-middle text-center" style="width: 2%;">Đất</th>
                                <th class="align-middle text-center" style="width: 2%;">CTXD</th>
                                <th class="align-middle text-center" style="width: 2%;">MMTB</th>
                                <th class="align-middle text-center" style="width: 2%;">Tổng cộng</th>
                                <th class="align-middle text-center" style="width: 2%;">CTY nhận sở hữu Dự án</th>
                                <th class="align-middle text-center" style="width: 2%;">Phương án tài chính</th>
                                <th class="align-middle text-center" style="width: 2.8%;">Đất</th>
                                <th class="align-middle text-center" style="width: 2.8%;">Công trình XD</th>
                                <th class="align-middle text-center" style="width: 2.8%;">Đất</th>
                                <th class="align-middle text-center" style="width: 2.8%;">Công trình XD</th>
                                <th class="align-middle text-center" style="width: 2.8%;">Đất</th>
                                <th class="align-middle text-center" style="width: 2.8%;">Công trình XD</th>
                            </tr>
                        </thead>
                        <tbody class="align-middle">
                            <tr v-for="(item, index) in data" :key="index">
                                <td class="text-center fw-bold">
                                    <span v-if="paginate.page <= 1">{{ index + 1 }}</span>
                                    <span v-else>{{ (paginate.page - 1) * paginate.limit + index + 1 }}</span>    
                                </td>
                                <td class="align-middle text-center">{{item.province_name}}</td>
                                <td  class="align-middle text-center">{{item.district_name}}</td>
                                <td>{{item.place_info}}</td>
                                <td class="align-middle text-center">{{item.group_name}}</td>
                                <td class="text-center">{{item.owner_info_name}}</td>
                                <td class="text-center">{{item.investor_info_name}}</td>
                                <td class="text-center">{{item.tenant_used_name}}</td>
                                <td class="text-center">{{item.tenant_used_admin}}</td>
                                <td class="text-center">{{item.project_name}}</td>
                                <td class="text-center" style="text-align:right">{{item.total_area}}</td>
                                <td>{{item.project_land_use}}</td>
                                <td class="align-middle text-center">{{item.project_expiration_date}}</td>
                                <td>{{item.project_land_origin}}</td>
                                <td>{{item.project_land_origin_actual}}</td>
                                <td>{{item.planning_legal_content}}</td>
                                <td>{{item.invest_legal_content}}</td>
                                <td>{{item.construction_legal_content}}</td>
                                <td>{{item.acceptance_legal_content}}</td>
                                <td>{{item.project_finance_content}}</td>
                                <td>{{item.bank_name}}</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">-</td>
                                <td class="text-center">
                                    <a class="btn-link cursor-pointer" @click="this.$router.push({ path: '/admin/reports/detail', query: {id:item.project_id}})">{{item.project_code}}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Paginate
                    :total="paginate.total"
                    :limit="paginate.limit"
                    @Handle="changePaginate"
                ></Paginate>
            </div>
        </div>
    </section>
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import Filters from '@Admin/components/common/Filters.vue'
import axios from 'axios';
import {ShowToast} from '@Helpers/Notify.js'
import ExcelJS from 'exceljs';
import dayjs from 'dayjs';
import Paginate from '@Admin/components/common/Paginate.vue'
const auth = JSON.parse(localStorage.getItem('authorize'))
const API_PATH_USER = import.meta.env.VITE_API_PATH_USER;
const API_PATH_STORE = import.meta.env.VITE_API_PATH_STORE;
const APP_PATH = import.meta.env.VITE_APP_PATH;

export default {
    data(){
        return{
            data : [],
            data_all : [],
            paginate : {
                total : 1,
                limit : 10,
                page : 1,
            },
            filter : {
                request : {
                    start_time : "",
                    end_time : "",
                },
            },
        }
    },
    components: {
       ...Icons,Filters,Paginate
    },
    created(){
        this.getData()
        this.getDataAll()
    },
    methods : {
        async setDataFilter(e){
            this.filter = await e
            await this.getData()
        },
        getData(){
            const data = {
                ...this.filter,
                page    : this.paginate.page,
                limit   : this.paginate.limit,
                search_list     : []
            }
            axios({
                method:'post',
                url: API_PATH_STORE + '/report/get-all-project',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: data
            }).then(res => {
                this.paginate.total = res.data.data.total           
                const result = res.data.data.items.map(item => {
                    item.project_expiration_date = dayjs(item.project_expiration_date).format('DD-MM-YYYY')
                    return item
                })
                this.data = result
            })
        },
        getDataAll(){
            const data = {
                search_list: [],
                limit: 100000
            }
            axios({
                method:'post',
                url: API_PATH_STORE + '/report/get-all-project',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: data
            }).then(res => {  
                const result = res.data.data.items.map(item => {
                    item.project_expiration_date = dayjs(item.project_expiration_date).format('DD-MM-YYYY')
                    return item
                })
                this.data_all = result
            })
        },
        
        changePaginate(e){
            this.paginate.page = e.page
            this.paginate.limit = e.limit
            this.getData()
        },


        async getDataToExcel(worksheet){
            this.data.forEach((item,index) => {
                worksheet.addRow(
                [
                    index + 1, 
                    item.province_name,
                    item.district_name,
                    item.place_info,
                    item.group_name,
                    item.owner_info_name,
                    item.investor_info_name,
                    item.tenant_used_name,
                    item.tenant_used_admin,
                    item.project_name,
                    item.total_area,
                    item.project_land_use,
                    item.project_expiration_date,
                    item.project_land_origin,
                    item.project_land_origin_actual,
                    item.planning_legal_content,
                    item.invest_legal_content,
                    item.construction_legal_content,
                    item.acceptance_legal_content,
                    item.project_finance_content,
                    item.bank_name,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    item.project_code,
                ]);
            });
        },

        async getAllDataToExcel(worksheet){
            this.data_all.forEach((item,index) => {
                worksheet.addRow(
                [
                    index + 1, 
                    item.province_name,
                    item.district_name,
                    item.place_info,
                    item.group_name,
                    item.owner_info_name,
                    item.investor_info_name,
                    item.tenant_used_name,
                    item.tenant_used_admin,
                    item.project_name,
                    item.total_area,
                    item.project_land_use,
                    item.project_expiration_date,
                    item.project_land_origin,
                    item.project_land_origin_actual,
                    item.planning_legal_content,
                    item.invest_legal_content,
                    item.construction_legal_content,
                    item.acceptance_legal_content,
                    item.project_finance_content,
                    item.bank_name,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    item.project_code,
                ]);
            });
        },


        async exportToExcel() {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Data');

            worksheet.getCell('A1').value = 'STT';
            worksheet.getCell('B1').value = 'Tỉnh/TP';
            worksheet.getCell('C1').value = 'Quận/Huyện';
            worksheet.getCell('D1').value = 'Địa chỉ thửa đất';
            worksheet.getCell('E1').value = 'Tập đoàn';
            worksheet.getCell('F1').value = 'Chủ sở hữu đất';
            worksheet.getCell('G1').value = 'Chủ đầu tư';
            worksheet.getCell('H1').value = 'Đơn vị sử dụng';
            worksheet.getCell('K1').value = 'Diện tích (m2)';
            worksheet.getCell('L1').value = 'Thông tin chi tiết thửa đất';
            worksheet.getCell('Q1').value = 'Pháp lý đầu tư';
            worksheet.getCell('R1').value = 'Pháp lý xây dựng';
            worksheet.getCell('S1').value = 'Tình trạng \chứng nhận sở hữu công trình';
            worksheet.getCell('T1').value = 'Tình trạng thế chấp';
            worksheet.getCell('U1').value = 'Nơi lưu QSDĐ';
            worksheet.getCell('V1').value = 'ĐỊNH GIÁ THỊ TRƯỜNG (ĐVT: Triệu đồng)';
            worksheet.getCell('Z1').value = 'Đề xuất';
            worksheet.getCell('AB1').value = 'Giá trị đầu tư';
            worksheet.getCell('AD1').value = 'Đã chi';
            worksheet.getCell('AF1').value = 'Còn lại';
            worksheet.getCell('AH1').value = 'Mã dự án';

            worksheet.getCell('H2').value = 'Tên Công ty sử dụng';
            worksheet.getCell('I2').value = 'Tên Quản trị';
            worksheet.getCell('J2').value = 'Dự án/Showroom';
            worksheet.getCell('L2').value = 'Mục đích sử dụng';
            worksheet.getCell('M2').value = 'Thời hạn sử dụng';
            worksheet.getCell('N2').value = 'Nguồn gốc đất (ghi nhận theo GCN QSDĐ)';
            worksheet.getCell('O2').value = 'Nguồn gốc tạo lập đất (theo thực tế)';
            worksheet.getCell('P2').value = 'Thông tin quy hoạch';
            worksheet.getCell('V2').value = 'Đất';
            worksheet.getCell('W2').value = 'CTXD';
            worksheet.getCell('X2').value = 'MMTB';
            worksheet.getCell('Y2').value = 'Tổng cộng';
            worksheet.getCell('Z2').value = 'CTY nhận sở hữu Dự án';
            worksheet.getCell('AA2').value = 'Phương án tài chính';
            worksheet.getCell('AB2').value = 'Đất';
            worksheet.getCell('AC2').value = 'Công trình XD';
            worksheet.getCell('AD2').value = 'Đất';
            worksheet.getCell('AE2').value = 'Công trình XD';
            worksheet.getCell('AF2').value = 'Đất';
            worksheet.getCell('AG2').value = 'Công trình XD';

            const mergedCells = [
                "A1:A2",
                "B1:B2",
                "C1:C2",
                "D1:D2",
                "E1:E2",
                "F1:F2",
                "G1:G2",
                "H1:J1",
                "K1:K2",
                "L1:P1",
                "Q1:Q2",
                "R1:R2",
                "S1:S2",
                "T1:T2",
                "U1:U2",
                "V1:Y1",
                "Z1:AA1",
                "AB1:AC1",
                "AD1:AE1",
                "AF1:AG1",
                "AH1:AH2",
            ]

            mergedCells.forEach((cell) => {worksheet.mergeCells(cell);});
            worksheet.getColumn('A').width = 6;
            worksheet.getColumn('B').width = 12;
            worksheet.getColumn('C').width = 12;
            worksheet.getColumn('D').width = 23;
            worksheet.getColumn('E').width = 15;
            worksheet.getColumn('F').width = 15;
            worksheet.getColumn('G').width = 15;
            worksheet.getColumn('H').width = 18;
            worksheet.getColumn('I').width = 18;
            worksheet.getColumn('J').width = 18;
            worksheet.getColumn('K').width = 18;
            worksheet.getColumn('L').width = 20;
            worksheet.getColumn('M').width = 20;
            worksheet.getColumn('N').width = 20;
            worksheet.getColumn('O').width = 20;
            worksheet.getColumn('P').width = 20;
            worksheet.getColumn('Q').width = 20;
            worksheet.getColumn('R').width = 20;
            worksheet.getColumn('S').width = 20;
            worksheet.getColumn('T').width = 15;
            worksheet.getColumn('U').width = 15;
            worksheet.getColumn('V').width = 13;
            worksheet.getColumn('W').width = 13;
            worksheet.getColumn('X').width = 13;
            worksheet.getColumn('Y').width = 13;
            worksheet.getColumn('Z').width = 15;
            worksheet.getColumn('AA').width = 15;
            worksheet.getColumn('AB').width = 15;
            worksheet.getColumn('AC').width = 15;
            worksheet.getColumn('AD').width = 15;
            worksheet.getColumn('AE').width = 15;
            worksheet.getColumn('AF').width = 15;
            worksheet.getColumn('AG').width = 15;
            worksheet.getColumn('AH').width = 15;

            
            await this.getDataToExcel(worksheet);
            for (let row = 1; row <= worksheet.rowCount; row++) {
                for (let col = 1; col <= worksheet.columnCount; col++) {
                const cell = worksheet.getCell(row, col);
                cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    }
                }
            }

            worksheet.getRow(1).height = 30;
            worksheet.getRow(2).height = 30;
            const headerStyle = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ffff00' },
            };

            const startCell = worksheet.getCell('A1');
            const endCell = worksheet.getCell('AH2');
            for (let row = startCell.row; row <= endCell.row; row++) {
                for (let col = startCell.col; col <= endCell.col; col++) {
                    const cell = worksheet.getCell(row, col);
                    cell.style.fill = headerStyle;
                    cell.width = 250;
                    cell.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };
                    cell.font = {bold: true}
                }
            }

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        },

        async exportAllToExcel() {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Data');

            worksheet.getCell('A1').value = 'STT';
            worksheet.getCell('B1').value = 'Tỉnh/TP';
            worksheet.getCell('C1').value = 'Quận/Huyện';
            worksheet.getCell('D1').value = 'Địa chỉ thửa đất';
            worksheet.getCell('E1').value = 'Tập đoàn';
            worksheet.getCell('F1').value = 'Chủ sở hữu đất';
            worksheet.getCell('G1').value = 'Chủ đầu tư';
            worksheet.getCell('H1').value = 'Đơn vị sử dụng';
            worksheet.getCell('K1').value = 'Diện tích (m2)';
            worksheet.getCell('L1').value = 'Thông tin chi tiết thửa đất';
            worksheet.getCell('Q1').value = 'Pháp lý đầu tư';
            worksheet.getCell('R1').value = 'Pháp lý xây dựng';
            worksheet.getCell('S1').value = 'Tình trạng \chứng nhận sở hữu công trình';
            worksheet.getCell('T1').value = 'Tình trạng thế chấp';
            worksheet.getCell('U1').value = 'Nơi lưu QSDĐ';
            worksheet.getCell('V1').value = 'ĐỊNH GIÁ THỊ TRƯỜNG (ĐVT: Triệu đồng)';
            worksheet.getCell('Z1').value = 'Đề xuất';
            worksheet.getCell('AB1').value = 'Giá trị đầu tư';
            worksheet.getCell('AD1').value = 'Đã chi';
            worksheet.getCell('AF1').value = 'Còn lại';
            worksheet.getCell('AH1').value = 'Mã dự án';

            worksheet.getCell('H2').value = 'Tên Công ty sử dụng';
            worksheet.getCell('I2').value = 'Tên Quản trị';
            worksheet.getCell('J2').value = 'Dự án/Showroom';
            worksheet.getCell('L2').value = 'Mục đích sử dụng';
            worksheet.getCell('M2').value = 'Thời hạn sử dụng';
            worksheet.getCell('N2').value = 'Nguồn gốc đất (ghi nhận theo GCN QSDĐ)';
            worksheet.getCell('O2').value = 'Nguồn gốc tạo lập đất (theo thực tế)';
            worksheet.getCell('P2').value = 'Thông tin quy hoạch';
            worksheet.getCell('V2').value = 'Đất';
            worksheet.getCell('W2').value = 'CTXD';
            worksheet.getCell('X2').value = 'MMTB';
            worksheet.getCell('Y2').value = 'Tổng cộng';
            worksheet.getCell('Z2').value = 'CTY nhận sở hữu Dự án';
            worksheet.getCell('AA2').value = 'Phương án tài chính';
            worksheet.getCell('AB2').value = 'Đất';
            worksheet.getCell('AC2').value = 'Công trình XD';
            worksheet.getCell('AD2').value = 'Đất';
            worksheet.getCell('AE2').value = 'Công trình XD';
            worksheet.getCell('AF2').value = 'Đất';
            worksheet.getCell('AG2').value = 'Công trình XD';

            const mergedCells = [
                "A1:A2",
                "B1:B2",
                "C1:C2",
                "D1:D2",
                "E1:E2",
                "F1:F2",
                "G1:G2",
                "H1:J1",
                "K1:K2",
                "L1:P1",
                "Q1:Q2",
                "R1:R2",
                "S1:S2",
                "T1:T2",
                "U1:U2",
                "V1:Y1",
                "Z1:AA1",
                "AB1:AC1",
                "AD1:AE1",
                "AF1:AG1",
                "AH1:AH2",
            ]

            mergedCells.forEach((cell) => {worksheet.mergeCells(cell);});
            worksheet.getColumn('A').width = 6;
            worksheet.getColumn('B').width = 12;
            worksheet.getColumn('C').width = 12;
            worksheet.getColumn('D').width = 23;
            worksheet.getColumn('E').width = 15;
            worksheet.getColumn('F').width = 15;
            worksheet.getColumn('G').width = 15;
            worksheet.getColumn('H').width = 18;
            worksheet.getColumn('I').width = 18;
            worksheet.getColumn('J').width = 18;
            worksheet.getColumn('K').width = 18;
            worksheet.getColumn('L').width = 20;
            worksheet.getColumn('M').width = 20;
            worksheet.getColumn('N').width = 20;
            worksheet.getColumn('O').width = 20;
            worksheet.getColumn('P').width = 20;
            worksheet.getColumn('Q').width = 20;
            worksheet.getColumn('R').width = 20;
            worksheet.getColumn('S').width = 20;
            worksheet.getColumn('T').width = 15;
            worksheet.getColumn('U').width = 15;
            worksheet.getColumn('V').width = 13;
            worksheet.getColumn('W').width = 13;
            worksheet.getColumn('X').width = 13;
            worksheet.getColumn('Y').width = 13;
            worksheet.getColumn('Z').width = 15;
            worksheet.getColumn('AA').width = 15;
            worksheet.getColumn('AB').width = 15;
            worksheet.getColumn('AC').width = 15;
            worksheet.getColumn('AD').width = 15;
            worksheet.getColumn('AE').width = 15;
            worksheet.getColumn('AF').width = 15;
            worksheet.getColumn('AG').width = 15;
            worksheet.getColumn('AH').width = 15;

            
            await this.getAllDataToExcel(worksheet);
            for (let row = 1; row <= worksheet.rowCount; row++) {
                for (let col = 1; col <= worksheet.columnCount; col++) {
                const cell = worksheet.getCell(row, col);
                cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    }
                }
            }

            worksheet.getRow(1).height = 30;
            worksheet.getRow(2).height = 30;
            const headerStyle = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ffff00' },
            };

            const startCell = worksheet.getCell('A1');
            const endCell = worksheet.getCell('AH2');
            for (let row = startCell.row; row <= endCell.row; row++) {
                for (let col = startCell.col; col <= endCell.col; col++) {
                    const cell = worksheet.getCell(row, col);
                    cell.style.fill = headerStyle;
                    cell.width = 250;
                    cell.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };
                    cell.font = {bold: true}
                }
            }

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        },
    }

}
</script>
<style lang="scss">
.table-report-detail{
    tr{
        td{
            // border: none!important;
        }
    }
    .tbody{
        tr{
            td{
                border: none!important;
                text-align: center;
            }
        }
    }
}
</style>