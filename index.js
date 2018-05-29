/**
 * @name 目录
 * @type Object
 */
var directory=(function()
{
/*成员*/
    var data=
    [
        {
            'title':'简介',
            'list':null
        },
        {
            'title':'语句',
            'list':
            [
                'mesh',
                'region',
                'electrode',
                'doping',
                'material',
                'trap',
                'output'
            ]
        },
        {
            'title':'模型',
            'list':
            [
                'Fermi-Dirac统计',
                '禁带宽度',
                '浓度依赖低电场迁移率',
                '平行电场依赖迁移率',
                'Klaassen统一低电场迁移率模型',
                'Shockley-Read-Hall复合',
                '陷阱辅助隧穿',
                '光产生辐射复合',
                '俄歇复合',
                'Selb碰撞离化模型',
                '带至带隧穿'
            ]
        },
        {
            'title':'模板',
            'list':null
        },
        {
            'title':'仿真策略',
            'list':
            [
                '拟合',
                '注意事项'
            ]
        },
    ];
    /**
     * @name onload
     * @type Function
     * @see directory
     */
    var onload=function()
    {
        var part=document.getElementById('side_directory');

        for(var i=0;i<data.length;i++)
        {
            var item=data[i];
            if(item['list']==null)
            {
                var div=document.createElement('div');
                div.className='directoryItem level1';
                div.innerHTML=item['title'];
                div.addEventListener('click',handlerItemClick);
            }
            else
            {
                var multilevelList=new MultilevelList(item['title'],handlerListTitleClick);
                for(var j=0;j<item['list'].length;j++)
                {
                    var subdiv=document.createElement('div');
                    subdiv.className='directoryItem level2';
                    subdiv.innerHTML=item['list'][j];
                    subdiv.addEventListener('click',handlerItemClick);
                    multilevelList.addItem(subdiv);
                }
                var div=multilevelList.dom;
            }
            part.appendChild(div);
        }
    };
    /**
     * @name 处理项目组标题点击事件
     * @type Function
     * @see directory
     */
    var handlerListTitleClick=function()
    {
        content.load(this.title.innerHTML);
    };
    /**
     * @name 处理项目点击事件
     * @type Function
     * @see directory
     */
    var handlerItemClick=function()
    {
        content.load(this.innerHTML);
    };

/*构造*/
    window.addEventListener('load',onload);
})();


/**
 * @name 内容
 * @type Object
 */
var content=(function()
{
/*成员*/
    var part;
    var title;
    var text;
    /**
     * @name 激活code元素
     * @type Function
     * @see content
     * @param {Array} elements code元素数组 
     */
    var activateCodes=function(elements)
    {
        elements.forEach(function(element)
        {
            element.addEventListener('click',function()
            {
                clipboard.copy(this.innerHTML);
                message.show('已复制到剪贴板');
            });
            $(element).attr('data-toggle','tooltip').attr('data-original-title','点击复制').tooltip();
        });
    }

/*接口*/
    /**
     * @name 载入
     * @type Function
     * @see content
     * @param {String} _title 标题
     */
    var load=function(_title)
    {
        var fadeOutPromise=new Promise(function(resolve,reject)
        {
            $(part).fadeOut('normal',function()
            {
                resolve(); 
            });
        });
        var ajaxPromise=new Promise(function(resolve,reject)
        {
            var url=
            `
                ./content/${_title}.html
            `;
            $.ajax({url:url,async:true,success:function(data)
            {
                resolve(data);
            }});
        });

        Promise.all([ajaxPromise,fadeOutPromise]).then(function(data)
        {
            title.innerHTML=_title;
            text.innerHTML=data[0];

            $(part).fadeIn();

            var codes=text.querySelectorAll('code');
            activateCodes(codes);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, text]);
        });
    };

/*构造*/
    window.addEventListener('load',function()
    {
        part=document.getElementById('main_content');
        title=document.getElementById('main_content_title');
        text=document.getElementById('main_content_text');

        load('简介');
    });

    return {load};
})();

/**
 * @name 消息框
 * @type Object
 */
var message=(function()
{
/*成员*/
    var part;
    var timer;

/*接口*/
    /**
     * @name 显示
     * @type Function
     * @see message
     * @param {String} text 文本 
     */
    var show=function(text)
    {
        part.innerHTML=text;
        clearTimeout(timer);
        $(part).stop().fadeIn();
        timer=setTimeout(function()
        {
            $(part).stop().fadeOut();
        },3000);
    };

/*构造*/
    window.addEventListener('load',function()
    {
        part=document.getElementById('message');
    });

    return {show};
})();