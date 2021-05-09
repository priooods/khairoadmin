<template>
    <div class="tabled">
        <Input type="text" v-model="searchtable" class="my-2" :placeholder="placeholder"></Input>
        <Table size="small" :row-class-name="rows" @on-row-click="rowclick" class="w-full" stripe border :columns="column" :data="datas"></Table>
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
        rows: null
    },
    name: "TableGlobal",
    data(){
        return{
            datas: [],
            searchtable: ''
        }
    },
    methods:{
        setPage(val){
            return this.datas = this.data.slice((val - 1) * 5, val * 5);
        },
        rowclick(value){
            return this.$emit('clickrow', value);
        }
    },
    watch:{
      searchtable: function (value){
        const search = value.toLowerCase().trim();
        if (!search) return this.setPage(1);
        return this.datas =  this.data.filter(c => 
            c[this.keys].toLowerCase().indexOf(search) > -1
        ); 
      }
    },
    mounted() {
        this.setPage(1);
    },
}
</script>

<style>

</style>