/**
 * @name 剪贴板
 */

/**
 * @name 剪贴板
 * @type Object
 */
var clipboard=(function()
{
/*成员*/
    var copyDummy;
    /**
     * @name 初始化
     * @type Function
     * @see clipboard
     */
    var initiate=function()
    {
        var statement=
        `
            <textarea class="copyDummy" style="position:absolute; width:0; height:0; opacity:0;" value=""></textarea>
        `;
        copyDummy=$(statement)[0];
        document.body.appendChild(copyDummy);
    };

/*接口*/
    /**
     * @name 复制
     * @type Function
     * @see clipboard
     * @param {String} value 内容
     */
    var copy=function(value)
    {
        copyDummy.value=value;
        copyDummy.select();
        document.execCommand("Copy");
    };

/*构造*/
    window.addEventListener("load",function()
    {
        initiate();
    });

    return {copy};
})();