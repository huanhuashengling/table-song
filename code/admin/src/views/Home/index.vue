<template>
<el-container>
    <el-header  :span="24" class="header">
    <h1>哈哈哈！现在就是“表歌”的天下！！！</h1>
    <h4>请和我一起吃着火锅，唱着“表歌”，让表格的暴风雨来得更猛烈些吧！</h4>
    </el-header>
    <el-main class="main-content">
    <h3>主要功能描述</h3>
    <h4>一.  新生学籍注册</h4>
    <ul>
    <li>1. 填报新生注册所需学籍信息</li>
    <li>2. 合法验证填报的72项数据，默认和非必要的字段不需要用户输入。</li>
    <li>3. 新生注册学籍信息导出</li>
    <li>4. 可以导出学前学籍续接模板，导出全部学籍注册信息。</li>
    </ul>
    <h4>二.  在校生学籍管理</h4>
    <ul>
    <li>1. 兼容市学籍和全国学籍</li>
    <li>2. 可以导入全国学籍，导入市学籍信息。</li>
    <li>3. 可以导出全部或筛选的国学籍信息，可以导出全部或筛选的市学籍信息。</li>
    <li>4. 满足国学籍市学籍日常工作需求</li>
    <li>5. 生成国学籍卡片</li>
    <li>6. 生成分年级，分班，分男女</li>
    </ul>
    </el-main>
</el-container>
</template>
<!-- <div class="home-container"> -->
    <!-- <Github githubLink="https://github.com/cd-dongzi"></Github> -->
    <!-- <h1>这里是表哥的天下！！！哈哈哈！！！</h1> -->
<!-- </div> -->

<script>
    // import Github from 'components/Github/index'
    export default {
        name: 'home',
        data() {
            return {
            }
        },
        // components: { Github },
        mounted () {}
    }
</script>
<style lang="less" scoped>
    .header {
        text-align: center;
        margin-top: 100px;
    }
    h1 {
        font-size: 30px;
        font-family: "Hiragino Sans GB";
    }
    h4 {
        font-family: "Hiragino Sans GB";
    }
    .main-content {
        font-family: "Hiragino Sans GB";
    }
</style>
