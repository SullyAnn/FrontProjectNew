<template> 
    <div v-if="isLoadingPage==false" id="sort-product">
			<label for="dog-sort">Sort by  : </label>
			<select :value="productSortType" @input="productSortTypeChanged" id="Az-sort">
                <option value="AZName">Name from A to Z</option>
                <option value="ZAName">Name from Z to A</option>

			</select>
    </div> 
</template>

<script>
export default {
  name: 'SortProduct',
  props: {
    productSortType: {type: String, required:true}
  },
  data(){
    return{
      isLoadingPage: false
    }
  },
  mounted(){
    this.$on("loadingPage", (data)=>{
      this.isLoadingPage = data
      console.log(this.isLoadingPage)
    })
  },

  methods:{
    productSortTypeChanged(event){
      this.$emit('update:productSortType', event.target.value)
    }
  }
}
</script>

<style>
#sort-product{
    z-index: 20;
    position: fixed;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #B8E8A7;
    border-radius: 20px;
    align-items: center;
    justify-content: space-around;
    bottom: 30px;
    right: 30px;
    font-weight: 600;
    z-index: -1;
}
#Az-sort{
    border: none;
    background-color: rgba(255,255,255,0);
    height: 40px;
    font-size: 16px;
    border-bottom: 1px solid;
}

</style>