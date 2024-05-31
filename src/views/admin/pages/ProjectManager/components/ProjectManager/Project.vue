<template lang="">
    <div class="col-lg-3 mb-3">
        <div class="card card-one border">
            <div class="card-header">
                <h6 class="mb-0 fw-bold">{{data.project_name}}</h6>
                <nav class="nav nav-icon nav-icon-sm ms-auto d-flex">
                    <button class="btn bg-secondary p-1 bg-transparent border-0 text-dark hover-jello" @click="OpenModalUpdate(data.id,'view')" href="#">
                        <IconEye :size="20" class="d-flex text-dark text-opacity-50" stroke-width="1.5" />
                    </button>
                    <div class="dropdown">
                        <a class="btn bg-secondary p-1 bg-transparent border-0 text-dark hover-jello" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <IconDotsVertical :size="20" class="d-flex text-dark text-opacity-50" stroke-width="1.5" />
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item p-2" @click="OpenModalUpdate(data.id,'edit')">
                                    <div class="d-flex gap-2">
                                        <div>
                                            <IconPencil :size="24" class="d-flex text-white bg-info bg-gradient rounded-2 p-1" stroke-width="1.5" />
                                        </div>
                                        <span>Chỉnh sửa dự án</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item p-2">
                                    <div class="d-flex gap-2">
                                        <div>
                                            <IconX :size="24" class="d-flex text-white bg-danger bg-gradient rounded-2 p-1" stroke-width="1.5" />
                                        </div>
                                        <span>Xóa dự án</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="card-body d-flex flex-column gap-2">
                <div class="d-flex">
                    <div class="d-flex">
                        <IconBriefcase :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                        <span class="ms-2">Mã dự án :</span>
                    </div>
                    <div class="flex-grow-1 text-end">
                        <span v-if="data.project_code">{{data.project_code}}</span>
                        <span v-else>-</span>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="d-flex">
                        <IconBriefcase :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                        <span class="ms-2">Loại dự án :</span>
                    </div>
                    <div class="flex-grow-1 text-end">
                        <span v-if="data.project_type">{{data.project_type}}</span>
                        <span v-else>-</span>
                    </div>
                </div>

                <div class="d-flex">
                    <div class="d-flex">
                        <IconUser :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                        <span class="ms-2">Chủ sở hữu :</span>
                    </div>
                    <div class="flex-grow-1 text-end">
                        <span v-if="data.owner_info_name">{{data.owner_info_name}}</span>
                        <span v-else>-</span>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="d-flex">
                        <IconUser :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                        <span class="ms-2">Chủ đầu tư :</span>
                    </div>
                    <div class="flex-grow-1 d-flex justify-content-end">
                        <p class="text-truncate mb-0 text-info cursor-pointer" :title="data.investor_info_name" style="max-width:150px" v-if="data.investor_info_name">{{data.investor_info_name}}</p>
                        <span v-else>-</span>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="d-flex">
                        <IconBuildingCommunity :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                        <span class="ms-2">Đơn vị sử dụng :</span>
                    </div>
                    <div class="flex-grow-1 text-end">
                        <span v-if="data.tenant_user_name">{{data.tenant_user_name}}</span>
                        <span v-else>-</span>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="d-flex">
                        <IconDimensions :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                        <span class="ms-2">Tổng diện tích dự án :</span>
                    </div>
                    <div class="flex-grow-1 text-end">
                        <span v-if="data.total_area">{{data.total_area}} m2</span>
                        <span v-else>-</span>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="d-flex">
                        <IconCalendar :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                        <span class="ms-2">Ngày tạo :</span>
                    </div>
                    <div class="flex-grow-1 text-end">
                        <span v-if="data.create_time">{{data.create_time}}</span>
                        <span v-else>-</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Icons from '@Admin/common/js/Icons';

export default {
    props : {
        data : Object,
    },
    components: {
        ...Icons
    },
    methods: {
        OpenModalUpdate(id,modal){
            this.$emit('OpenModalUpdate',{id:id,modal:modal});
        }
    }
}
</script>
<style lang="">
    
</style>