<template>
    <StudentComponent :info="studentInfo"></StudentComponent>
</template>
<script>
    import { mapGetters } from 'vuex'
    // import searchComponent from './search.vue'
    // import infoComponent from './info.vue'
    import StudentComponent from './student.vue'
    // import TagsComponent from './tags.vue'
    export default {
        data () {
            return {
                studentInfo: {},
                winH: document.documentElement.clientHeight || document.body.clientHeight
            }
        },
        components: {
            // searchComponent,
            StudentComponent,
            // TagsComponent
        },
        mounted () {
            window.addEventListener('scroll', () => {
                let distance = document.documentElement.scrollTop || document.body.scrollTop,
                    scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
                
                if (distance+this.winH >= scrollH) {
                    if (this.blogLoadingBol) {
                        console.log(111)
                        // this.pageindex ++;
                        // this.$store.dispatch('getStudentList', {
                        //     type: this.$route.params.classify,
                        //     pageindex: this.pageindex
                        // })
                    }
                }
            })
        },
        computed: {
            ...mapGetters([
                'pc_bol',
                'stduentInfo',
            ])
        }
    }
</script>
<style lang="less" scoped>
    .tags-box {
        width: 30%;
        float: left;
    }
    .view-box {
        width: 67%;
        float: right;
    }
</style>