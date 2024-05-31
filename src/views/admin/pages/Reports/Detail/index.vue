<template lang="">
    <section>
        <div class="card card-one">
            <div class="card-header">
                <div class="d-flex w-100 align-items-center gap-2">
                    <div class="d-flex align-items-center gap-2">
                        <div>
                            <IconChartPieFilled :size="34" stroke-width="3" class="d-flex bg-success bg-opacity-25 p-2 text-success rounded-3"/>
                        </div>

                        <!-- <SelectDropdown
                            :DataSearch="projects"
                        ></SelectDropdown> -->

                        <div class="input-group flex-grow-1">
                            <span class="input-group-text text-muted fw-semibold" id="basic-addon1">
                            CHỌN DỰ ÁN
                            </span>
                            <el-select class="custom-selectbox" v-model="project_selected" filterable placeholder="Chọn đơn vị báo cáo..." size="large" :teleported="false" >
                                <el-option
                                v-for="item in projects_select"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                        </div>
                        
                        <div>
                            <button class="btn bg-gradient-green text-white text-nowrap border-0 px-3" @click="GetReportDetail">Xem báo cáo</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row" v-if="data">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-header d-flex">
                                <div class="card-title flex-grow-1">
                                    <span>Thông tin chung của dự án</span>
                                </div>
                                <ul class="nav nav-pills" id="pills-tab-report-detail" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-project" type="button" role="tab">Thông tin</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-legal" type="button" role="tab">Pháp lý</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body overflow-auto custom-scrollbar" style="max-height:75vh;min-height:75vh">
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-project" role="tabpanel" tabindex="0">
                                        <ul class="list-group list-group-flush" v-if="data.dataProject">
                                            <div class="d-flex align-items-center justify-content-between fs-xs mb-1">
                                                <label class="mg-b-0 fw-medium text-secondary">Thông tin dự án</label>
                                                <!-- <a href="">Show All</a> -->
                                            </div>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Mã dự án</span>
                                                </span>
                                                <span class="ff-numerals">{{data.dataProject.project_code}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tên dự án</span>
                                                </span>
                                                <span class="ff-numerals">{{data.dataProject.project_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Ngày dự án</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatDate(data.dataProject.project_create_time,'DD/MM/YYYY')}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3 me-5">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span class="text-nowrap">Địa chỉ</span>
                                                </span>
                                                <span class="ff-numerals text-end">{{data.dataProject.place_info}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tỉnh thành</span>
                                                </span>
                                                <span class="ff-numerals">{{data.dataProject.province_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Quận/Huyện</span>
                                                </span>
                                                <span class="ff-numerals">{{data.dataProject.district_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tổng diện tích</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.dataProject.total_area)}}</span>
                                            </li>
                                            <div class="d-flex align-items-center justify-content-between fs-xs mt-3 mb-1 cursor-pointer">
                                                <label class="mg-b-0 fw-medium text-secondary">Tài chính dự án</label>
                                                <!-- <a href="">Show All</a> -->
                                            </div>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Giá trị dự toán</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.dataProject.estimated_investment_value)}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tổng chi đầu tư</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.dataProject.total_investment_value)}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Vốn chủ sở hữu</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.dataProject.total_accounting_value)}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Vốn vay</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.dataProject.total_mortgage_value)}}</span>
                                            </li>
                                            <div class="d-flex align-items-center justify-content-between cursor-pointer fs-xs mt-3 mb-1">
                                                <label class="mg-b-0 fw-medium text-secondary">Pháp nhân</label>
                                                <!-- <a href="">Show All</a> -->
                                            </div>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Chủ sở hữu</span>
                                                </span>
                                                <span class="ff-numerals">{{data.dataProject.owner_info_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Chủ đầu tư</span>
                                                </span>
                                                <span class="ff-numerals">{{data.dataProject.investor_info_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Chủ sở hữu đất</span>
                                                </span>
                                                <span class="ff-numerals">{{data.dataProject.owner_info_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Đơn vị sử dụng</span>
                                                </span>
                                                <span class="ff-numerals">{{data.dataProject.owner_land_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Giải ngân vốn vay</span>
                                                </span>
                                                <span class="ff-numerals">0</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="26" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Thiết kế - thi công thực hiện</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.dataProject.total_contract_value)}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane fade" id="pills-legal" role="tabpanel" tabindex="0">
                                        <ul class="list-group list-group-flush" v-if="data.masterPlaningLegal">
                                            <div class="d-flex align-items-center justify-content-start fs-xs mb-2">
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <label class="mg-b-0 fw-semibold text-dark h6 mb-0 text-uppercase">
                                                    PHÁP LÝ QUY HOẠCH
                                                </label>
                                            </div>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tên dự án</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterPlaningLegal.planning_project_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Chức năng</span>
                                                </span>
                                                <span class="ff-numerals" v-if="data.masterPlaningLegal">{{data.masterPlaningLegal.planning_function}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Quy mô dân số</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.masterPlaningLegal.planning_population_size)}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Mật độ xây dựng</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterPlaningLegal.planning_building_density}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Hệ số sử dụng đất</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.masterPlaningLegal.planning_land_use_factor)}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Chiều cao công trình</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.masterPlaningLegal.planning_building_height)}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Số tầng</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterPlaningLegal.planning_number_floors}}</span>
                                            </li>
                                            <hr style="border-color:#bdbdbd">
                                        </ul>
                                        
                                        <ul class="list-group list-group-flush" v-if="data.masterInvestLegal">
                                            <div class="d-flex align-items-center justify-content-start fs-xs mb-2">
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <label class="mg-b-0 fw-semibold text-dark h6 mb-0 text-uppercase">
                                                    PHÁP LÝ ĐẦU TƯ
                                                </label>
                                            </div>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tên dự án</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterInvestLegal.invest_project_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Quy mô dự án</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterInvestLegal.invest_project_scale}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Hình thức đầu tư</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterInvestLegal.invest_investment_type}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tiến độ thực hiện dự án</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterInvestLegal.invest_project_schedule}}</span>
                                            </li>
                                            <hr style="border-color:#bdbdbd">
                                        </ul>
                                        
                                        <ul class="list-group list-group-flush" v-if="data.masterLandLegal">
                                            <div class="d-flex align-items-center justify-content-start fs-xs mb-2">
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <label class="mg-b-0 fw-semibold text-dark h6 mb-0 text-uppercase">
                                                    PHÁP LÝ ĐẤT
                                                </label>
                                            </div>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Mục đích sử dụng đất</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterLandLegal.land_function}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Hình thức sử dụng đất</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterLandLegal.land_use_type}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Nguồn gốc tạo lập</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterLandLegal.land_origin}}</span>
                                            </li>
                                            <hr style="border-color:#bdbdbd">
                                        </ul>
                                        
                                        <ul class="list-group list-group-flush" v-if="data.masterConstructionlLegal">
                                            <div class="d-flex align-items-center justify-content-start fs-xs mb-2">
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <label class="mg-b-0 fw-semibold text-dark h6 mb-0 text-uppercase">
                                                    PHÁP LÝ XÂY DỰNG
                                                </label>
                                            </div>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tên công trình</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterConstructionlLegal.construction_project_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Vị trí xây dựng</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterConstructionlLegal.construction_location}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Mật độ xây dựng</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.masterConstructionlLegal.construction_building_density)}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Diện tích xây dựng</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.masterConstructionlLegal.construction_building_area)}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tổng diện tích sàn xây dựng</span>
                                                </span>
                                                <span class="ff-numerals">{{FormatCurrency(data.masterConstructionlLegal.construction_total_area)}}</span>
                                            </li>

                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Chỉ giới xây dựng</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterConstructionlLegal.construction_boundaries}}</span>
                                            </li>

                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Cấp công trình</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterConstructionlLegal.construction_project_level}}</span>
                                            </li>

                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Kết cấu công trình</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterConstructionlLegal.construction_structure}}</span>
                                            </li>
                                            <hr style="border-color:#bdbdbd">
                                        </ul>
                                        
                                        <ul class="list-group list-group-flush" v-if="data.masterAcceptanceLegal">
                                            <div class="d-flex align-items-center justify-content-start fs-xs mb-2">
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <label class="mg-b-0 fw-semibold text-dark h6 mb-0 text-uppercase">
                                                    PHÁP LÝ NGHIỆM THU & SỠ HỮU CÔNG TRÌNH
                                                </label>
                                            </div>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Mã dự án</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterAcceptanceLegal.project_code}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Tên công trình</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterAcceptanceLegal.acceptance_construction_name}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Diện tích xây dựng</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterAcceptanceLegal.acceptance_building_area}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Diện tích sàn xây dựng hoặc công suất</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterAcceptanceLegal.acceptance_total_area}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Số tầng</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterAcceptanceLegal.acceptance_number_floors}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Cấp công trình</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterAcceptanceLegal.acceptance_construction_level}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Thời gian hoàn thành xây dựng</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterAcceptanceLegal.acceptance_completion_time}}</span>
                                            </li>
                                            <li class="list-group-item px-0 d-flex justify-content-between cursor-pointer">
                                                <span class="fw-medium d-flex align-items-center gap-3">
                                                    <IconChartPieFilled :size="24" stroke-width="3" class="d-flex bg-secondary bg-opacity-25 p-1 text-secondary rounded-2"/>
                                                    <span>Thời hạn sở hữu</span>
                                                </span>
                                                <span class="ff-numerals">{{data.masterAcceptanceLegal.acceptance_ownership_period}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="table-responsive h-scrollbar mb-3 w-100" style="max-height: 72vh;min-height: 100%">
                            <table class="table table-hover table-striped align-middle" style="width:100%" v-if="$CheckPermission('Asset_Manager','is_allow_access')">
                                <thead class="table-fixed">
                                    <tr>
                                        <th scope="col" width="3%" class="text-center bg-white fw-semibold text-nowrap">#</th>
                                        <th scope="col" width="1%" class="bg-white fw-semibold text-nowrap text-center">Hạng mục</th>
                                        <th scope="col" width="15%" class="bg-white fw-semibold text-nowrap text-center">Nhóm</th>
                                        <th scope="col" width="7%" class="bg-white fw-semibold text-nowrap text-end">Số hồ sơ</th>
                                        <th scope="col" width="7%" class="bg-white fw-semibold text-nowrap text-center">Trạng thái</th>
                                        <th scope="col" width="5%" class="bg-white fw-semibold text-nowrap text-end">Giá trị</th>
                                        <th scope="col" width="8%" class="bg-white fw-semibold text-nowrap text-center" style="z-index:99">Ngày dự kiến hoàn thành</th>
                                    </tr>
                                </thead>
                                <tbody v-if="data.lstDetailLegals">
                                    <tr class="cursor-pointer table-fixed" v-for="(item, index) in data.lstDetailLegals" :key="index">
                                        <th scope="row" class="text-center">{{index + 1}}</th>
                                        <td width="25%">{{item.legal_content}}</td>
                                        <td width="5%">{{item.legal_type}}</td>
                                        <td width="5%" class="text-end">{{item.count_file}}</td>
                                        <td width="5%" class="text-center">
                                            <span v-for="(status_item, index) in status" :key="index">
                                                <span class="status-badge badge fw-medium rounded-2 py-1 px-2"
                                                v-if="status_item.id == item.status_content"
                                                :style='{backgroundColor : "#" + status_item.color}'>{{status_item.value}}</span>
                                            </span>
                                        </td>
                                        <td width="5%" class="text-end">{{item.number_value}}</td>
                                        <td width="5%" class="text-center">{{FormatDate(item.estimated_date_finish,'DD/MM/YYYY')}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div v-else style="min-height:80vh" class="d-flex align-items-center justify-content-center bg-light border rounded-3 flex-column">
                    <img src="/assets/images/no-choice.svg" height="250" class="mb-3" alt="">
                    <h5 class="mb-0 fw-light text-secondary">CHƯA CHỌN DỰ ÁN ĐỂ BÁO CÁO</h5>
                </div>
            </div>
        </div>
    </section>
    <!-- <section>
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
                                <td class="text-center">{{item.project_code}}</td>
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
    </section> -->
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import Filters from '@Admin/components/common/Filters.vue'
import axios from 'axios';
import {ShowToast} from '@Helpers/Notify.js'
import ExcelJS from 'exceljs';
import dayjs from 'dayjs';
import Paginate from '@Admin/components/common/Paginate.vue'
import SelectDropdown from '@Admin/components/common/SelectDropdown.vue'
const auth = JSON.parse(localStorage.getItem('authorize'))
const API_PATH_USER = import.meta.env.VITE_API_PATH_USER;
const API_PATH_STORE = import.meta.env.VITE_API_PATH_STORE;
const APP_PATH = import.meta.env.VITE_APP_PATH;
import {FormatDate,FormatCurrency} from '@Helpers/utils.js'

import { ElSelect,ElOption } from 'element-plus'

export default {
    data(){
        return{
            project_selected : "",
            projects : [],
            projects_select : [],
            data : "",
            data_all : [],
            paginate : {
                total : 1,
                limit : 10,
                page : 1,
            },
            status : [],
            filter : {
                request : {
                    start_time : null,
                    end_time : null,
                },
            },
        }
    },
    components: {
       ...Icons,Filters,Paginate,SelectDropdown,ElOption,ElSelect
    },
    created(){
        this._Init();
        // this.getData()
        // this.getDataAll()
    },
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            await this.GetStatus()
            await this.GetAllProject()
            if(this.$route.query.id){
                this.project_selected = await this.$route.query.id
                this.GetReportDetail()
            }
        },

        async setDataFilter(e){
            this.filter = await e
            await this.getData()
        },

        GetAllProject(){
            try {
                const params = {
                    page    : 0,
                    limit   : 0,
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(API_PATH_STORE + '/project/get-all',params,config)
                .then(async res => {
                    this.projects = res.data.data.items
                    this.projects_select = this.projects.map(item => {
                        let arr = {
                            value : item.id,
                            label : item.project_code + '|' + item.project_name
                        }
                        return arr
                    })
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        GetReportDetail(){
            try {
                const params = {
                    item : this.project_selected,
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(API_PATH_STORE + '/report/get-project-by-id',params,config)
                .then(async res => {
                    this.data = res.data.data
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        GetStatus(){
            try {
                const params = {
                    item : this.project_selected,
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(API_PATH_STORE + '/get-status-json/get-status-legal-project',params,config)
                .then(async res => {
                    this.status = res.data
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        getData(){
            const data = {
                ...this.filter,
                page    : this.paginate.page,
                limit   : this.paginate.limit,
                tenant_id       : "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                // search_list     : [
                //     {
                //         name_field      : "string",
                //         value_search    : "string"
                //     }
                // ]
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
                page    : 0,
                limit   : 0,
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
        },FormatDate,FormatCurrency
    }

}
</script>
<style lang="scss">
#pills-tab-report-detail{
    .nav-item{
        .nav-link{
            &.active{
                background: linear-gradient(195deg, #00a1ff, #0012ed);
                color: #FFFFFF;
            }
            
        }
    }
}
</style>