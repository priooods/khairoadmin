<template>
    <div class="tabled overflow-x-hidden">
        <div class="flex justify-end md:w-2/6 w-full ml-auto my-3" v-if="!searchide">
            <Input type="text" v-model="searchtable" @on-change="onchanges"
            :placeholder="placeholder" ></Input>
            <div @click="searchNow" class="bg-blue-400 cursor-pointer hover:bg-blue-500 px-4 rounded-r-sm text-white font-hasmedium flex items-center"><p>Cari</p></div>
        </div>
        <Table size="small" :row-class-name="rows" @on-row-click="rowclick"
            @closeTabAproval="closeTabAproval" class="tables overflow-x-hidden" 
            :stripe="true" :border="true" :columns="column" :data="data">
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalpage" :current="1" size="small"  @on-change="setPage"></Page>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        column: null,
        data: null,
        keys: null,
        totalpage: Number,
        placeholder: null,
        rows: null,
        searchide: Boolean,
    },
    name: "TableGlobal",
    data(){
        return{
            searchtable: '',
        }
    },
    methods:{
        onchanges(event){
            if(!event.target.value){
                return this.$emit('clearsearch');
            }
        },
        setPage(val){
            return this.$emit('changepage', val);
        },
        rowclick(value){
            return this.$emit('clickrow', value);
        },
        searchNow(){
            return this.$emit('searching', this.searchtable);
        },
        closeTabAproval(){
            return this.$emit('closeTabAproval',false);
        }
    },
}
</script>

<style>
.ivu-table::-webkit-scrollbar{
    width: 0px;
    height: 0px !important;
}
.ivu-table::-webkit-scrollbar-thumb{
    background: red;
}
</style>