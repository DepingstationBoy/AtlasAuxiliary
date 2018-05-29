/**
 * @name 多级列表
 * @description MultilevelList是多级列表类，可以实例化一个多级列表的虚拟类，对象的dom属性是真实的DOM对象。利用addList方法添加MultilevelList对象到属性list中，可以形成多级列表。利用addItem方法添加列表项目，项目可以是任意DOM元素。
 */

/**
 * @name 多级列表
 * @type Class
 */
class MultilevelList
{
/*构造*/
    /**
     * @name 构造方法
     * @type Function
     * @see MultilevelList
     * @param {Stirng} title 标题
     * @param {Function} titleClickCallback 标题点击回调函数，可选
     */
    constructor(title,titleClickCallback=null)
    {
        this.dom=null;
        this.title=null;
        this.list=null;
        this.state_fold=false;

        var triangle=document.createElement('span');
        triangle.className='multilevelList_triganle';
        triangle.addEventListener('click',this.handlerTriangleClick.bind(this));
        this.title=document.createElement('span');
        this.title.className='multilevelList_title';
        this.title.innerHTML=title;
        if(titleClickCallback)
            this.title.addEventListener('click',titleClickCallback.bind(this));
        var top=document.createElement('div');
        top.className='multilevelList_top';
        top.appendChild(triangle);
        top.appendChild(this.title);
        this.list=document.createElement('div');
        this.list.className='multilevelList_list';

        this.dom=document.createElement('div');
        this.dom.className='multilevelList';
        this.dom.appendChild(top);
        this.dom.appendChild(this.list);
    }

/*成员*/
    /**
     * @name 处理标题点击
     * @type Function
     * @see MultilevelList
     */
    handlerTriangleClick()
    {
        this.state_fold=!this.state_fold;

        if(this.state_fold)
        {
            this.dom.classList.add('fold');
            $(this.list).slideUp();
        }
        else 
        {
            this.dom.classList.remove('fold');
            $(this.list).slideDown();
        }
    }

/*接口*/
    /**
     * @name 添加列表
     * @type Function
     * @see MultilevelList
     * @param {Object} 多级列表，MultiplyLevelList 
     */
    addList(list)
    {
        this.list.appendChild(list);
    }
    /**
     * @name 添加项目
     * @type Function
     * @see MultilevelList
     * @param {Object} item 项目。DOM元素
     */
    addItem(item)
    {
        item.classList.add('multilevelList_item');
        this.list.appendChild(item);
    }
}

(function()
{
    var css=
    `
        .multilevelList
        {
            transition:height 0.5s;
        }

        .multilevelList_top
        {
            display:flex;
            align-items:center;
            position:relative;
        }

        .multilevelList_triganle
        {
            display:inline-block;
            position:absolute;
            right:100%;
            
            width:0.6em;
            height:0.6em;
            margin-right:0.5em;

            transform-origin:center center;

            background-color:currentColor;
            clip-path:polygon(0 0,100% 0,50% 100%);
        }
        .multilevelList.fold .multilevelList_triganle
        {
            transform:rotate(-90deg);
        }

        .multilevelList_list
        {
            margin-left:1.5em;
        }
    `;

    window.addEventListener('load',function()
    {
        var style=document.createElement('style');
        style.innerHTML=css;
        document.head.appendChild(style);
    });
})();