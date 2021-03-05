/**
 * PostCSS 配置文件
 */
module.exports = {
    // 配置要使用的 PostCSS 插件
    plugins: {
        // 配置使用 autoprefixer 插件
        // 作用：生成浏览器 CSS 样式规则前缀
        // VueCLI 内部已经配置了  autoprefixer 插件
        // 所以又配置了一次  产生冲突
        // 'autoprefixer': { // autoprefixer 插件的配置
        //     // 配置要兼容到的环境信息
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        // 配置使用 postcss-pxtorem 插件
        // 作用：把 px 转为 rem
        'postcss-pxtorem': {
            // lib - flexible 的 REM 适配方案: 把一行分为 10 份 每份就是十分之一
            // 所以 rootValue 应该设置为你的设计稿宽度的十分之一
            // 我们的设计稿是750  所以应该设置为  750/10=75
            // 但是vant 建议设置为37.5  因为vant 是基于375 写的
            // 所以必须设置为37.5 唯一的缺点就是使用我们设计稿的尺寸都必须 /2
            // 如果是Vant的样式  就按照37.5来转换
            // 如果是我们自己的的样式  就按照75来转换
            // rootValue支持两种类型  数字:固定的数值  函数:可以动态处理返回
            // postcss-pxtorem 处理每个 css 文件的时候 都会来调用这个函数  
            // 它会把被处理的css 文件相关的信息通过参数 传递给该函数
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },

            // rootValue: 75,
            // 配置要转换的 CSS 属性
            // * 表示所有
            propList: ['*'],

            // 配置不要转换的样式资源
            exclude: 'github-markdown'
        }
    }
}