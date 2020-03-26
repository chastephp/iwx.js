// import 'iwx';
import FastClick from 'fastclick';
import iwx from '../src/iwx';

FastClick.attach(document.body);

/* dialog */
document.querySelector('#alertBtn').addEventListener('click', function () {
    iwx.showModal({
        title: '自定义标题',
        content: '自定义标题的Alert',
        showCancel: false,
        success: (res) => {
            console.log('success', res);
        }
    });
});

/* confirm */
document.querySelector('#confirmBtn').addEventListener('click', function () {
    iwx.showModal({
        title: '自定义标题',
        content: '自定义标题的Confirm',
        showCancel: false,
        success: (res) => {
            console.log('success', res);
        }
    });
});

/* toast */
document.querySelector('#toastBtn').addEventListener('click', function () {
    iwx.showToast({
        title: '操作成功',
        duration: 3000,
        icon: 'none'
    });
});

/* modal */
document.querySelector('#modalBtn').addEventListener('click', function () {
    iwx.showModal({
        title: '操作成功',
        content: 'xxoo',
    });
});

/* loading */
document.querySelector('#loadingBtn').addEventListener('click', function () {
    iwx.showLoading({
        title: 'loading'
    });
    setTimeout(function () {
        iwx.hideLoading();
    }, 3000);
});

/* actionSheet */
document.querySelector('#actionSheetBtn').addEventListener('click', function () {
    iwx.showActionSheet({
        itemList: ['A', 'B', 'C'],
        success (res) {
            console.log(res,'xxx')
        },
        fail (res) {
            console.log(res.errMsg)
        }
    })
});

/* topTips */
document.querySelector('#topTipsBtn').addEventListener('click', function () {
    iwx.topTips('请填写正确的字段', {
        duration: 3000,
        className: 'custom-classname',
        callback: function () {
            console.log('close');
        }
    });
});

/* picker */
// 普通选择器
document.querySelector('#pickerBtn').addEventListener('click', function () {
    iwx.picker([{
        label: '飞机票',
        value: 0
    }, {
        label: '火车票(disabled)',
        disabled: true,
        value: 1
    }, {
        label: '的士票',
        value: 2
    }, {
        label: '住宿费',
        value: 3
    }, {
        label: '礼品费(disabled)',
        value: 4,
        disabled: true,
    }, {
        label: '活动费',
        value: 5
    }, {
        label: '通讯费',
        value: 6
    }, {
        label: '补助',
        value: 7
    }, {
        label: '通讯费',
        value: 8
    }, {
        label: '其他',
        value: 9
    }], {
        defaultValue: [2],
        className: 'custom-classname',
        onChange: function (result) {
            //console.log(item, index);
            console.log(result);
        },
        onConfirm: function (result) {
            console.log('confirm');
            console.log(result);
        },
        id: 'picker',
        title: '单列选择器'
    });
});

// 时间选择器
document.querySelector('#datePickerBtn').addEventListener('click', function () {
    iwx.datePicker({
        start: '2016-12-29',
        end: '2030-12-29',
        /**
         * https://zh.wikipedia.org/wiki/Cron
         * cron 表达式后三位
         * 示例：
         *  * * *                每天
         *  5 * *                每个月的5日
         *  1-10 * *             每个月的前10日
         *  1,5,10 * *           每个月的1号、5号、10号
         *  *\/2 * *             每个月的 1、3、5、7...日，注意写的时候斜杠“/”前面没有反斜杠“\”，这是因为是注释所以需要转义
         *  * 2 0                2月的每个周日
         *  * * 0,6              每个周末
         *  * * 3                每周三
         */
        cron: '* */2 0',
        defaultValue: [2017, 7, 9],
        onChange: function (result) {
            console.log(result);
        },
        onConfirm: function (result) {
            console.log(result);
        },
        id: 'datePicker',
        title: '日期选择器'
    });
});

// 多列选择器
document.querySelector('#multiPickerBtn').addEventListener('click', function () {
    iwx.picker([
        {
            label: '1',
            value: '1'
        }, {
            label: '2',
            value: '2'
        }, {
            label: '3',
            value: '3'
        }
    ], [
        {
            label: 'A',
            value: 'A'
        }, {
            label: 'B',
            value: 'B'
        }, {
            label: 'C',
            value: 'C'
        }
    ], {
        defaultValue: ['3', 'A'],
        onChange: function (result) {
            console.log(result);
        },
        onConfirm: function (result) {
            console.log(result);
        },
        id: 'multiPickerBtn',
        onClose: function () {
            console.log('onClose');
        },
        title: '多列选择器'
    });
});

// 级联选择器
document.querySelector('#cascadePickerBtn').addEventListener('click', function () {
    iwx.picker([
        {
            label: '广东',
            value: 0,
            children: [
                {
                    label: '广州',
                    value: 0,
                    children: [
                        {
                            label: '海珠',
                            value: 0
                        }, {
                            label: '番禺',
                            value: 1
                        }
                    ]
                }, {
                    label: '佛山',
                    value: 1,
                    children: [
                        {
                            label: '禅城',
                            value: 0
                        }, {
                            label: '南海',
                            value: 1
                        }
                    ]
                }
            ]
        }, {
            label: '广西',
            value: 1,
            children: [
                {
                    label: '南宁',
                    value: 0,
                    children: [
                        {
                            label: '青秀',
                            value: 0
                        }, {
                            label: '兴宁',
                            value: 1
                        }
                    ]
                }, {
                    label: '桂林',
                    value: 1,
                    children: [
                        {
                            label: '象山',
                            value: 0
                        }, {
                            label: '秀峰',
                            value: 1
                        }
                    ]
                }
            ]
        }
    ], {
        depth: 3,
        defaultValue: [0, 1, 1],
        onChange: function (result) {
            console.log(result);
        },
        onConfirm: function (result) {
            console.log(result);
        },
        id: 'cascadePicker',
        title: '嵌套选择器'
    });
});

/* searchbar */
iwx.searchBar('#searchBar');

/* slider 因为需要获取长度，所以必须要在slider显示的时候才调用iwx.slider*/
var isSetSlider = false;

function setSlider () {
    if (isSetSlider) return;
    isSetSlider = true;

    // 普通slider
    var sliderValue = document.getElementById('sliderValue');
    iwx.slider('#slider', {
        defaultValue: 50,
        onChange: function (percent) {
            sliderValue.innerHTML = Math.round(percent);
            console.log(percent);
        }
    });

    // 带step的slider
    var sliderStepValue = document.getElementById('sliderStepValue');
    iwx.slider('#sliderStep', {
        step: 10,
        defaultValue: 40,
        onChange: function (percent) {
            sliderStepValue.innerHTML = Math.round(percent);
            console.log(percent);
        }
    });

    // 分块的slider
    var sliderBlockValue = document.getElementById('sliderBlockValue');
    iwx.slider('#sliderBlock', {
        step: 100 / 3,
        defaultValue: 33.333,
        onChange: function (percent) {
            sliderBlockValue.innerHTML = Math.round(percent);
            console.log(percent);
        }
    });
}

/* tab */
iwx.tab('#tab', {
    defaultIndex: 0,
    onChange: function (index) {
        console.log(index);

        if (index == 3) {
            setSlider(); // 设置slider
        }
    }
});

/* form */
// 约定正则
var regexp = {
    regexp: {
        IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
        VCODE: /^.{4}$/
    }
};

// 失去焦点时检测
iwx.form.checkIfBlur('#form', regexp);

// 表单提交
document.querySelector('#formSubmitBtn').addEventListener('click', function () {
    iwx.form.validate('#form', function (error) {
        console.log(error);
        if (!error) {
            var loading = iwx.loading('提交中...');
            setTimeout(function () {
                loading.hide();
                iwx.toast('提交成功', 3000);
            }, 1500);
        }
    }, regexp);
});

/* 图片自动上传 */
var uploadCount = 0, uploadList = [];
var uploadCountDom = document.getElementById('uploadCount');
iwx.uploader('#uploader', {
    url: 'http://' + location.hostname + ':8002/upload',
    auto: true,
    type: 'file',
    fileVal: 'fileVal',
    compress: {
        width: 1600,
        height: 1600,
        quality: .8
    },
    onBeforeQueued: function (files) {
        if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(this.type) < 0) {
            iwx.alert('请上传图片');
            return false;
        }
        if (this.size > 10 * 1024 * 1024) {
            iwx.alert('请上传不超过10M的图片');
            return false;
        }
        if (files.length > 5) { // 防止一下子选中过多文件
            iwx.alert('最多只能上传5张图片，请重新选择');
            return false;
        }
        if (uploadCount + 1 > 5) {
            iwx.alert('最多只能上传5张图片');
            return false;
        }

        ++uploadCount;
        uploadCountDom.innerHTML = uploadCount;
    },
    onQueued: function () {
        uploadList.push(this);
        console.log(this);
    },
    onBeforeSend: function (data, headers) {
        console.log(this, data, headers);
        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

        // return false; // 阻止文件上传
    },
    onProgress: function (procent) {
        console.log(this, procent);
    },
    onSuccess: function (ret) {
        console.log(this, ret);
    },
    onError: function (err) {
        console.log(this, err);
    }
});

// 缩略图预览
document.querySelector('#uploaderFiles').addEventListener('click', function (e) {
    var target = e.target;

    while (!target.classList.contains('iwx-uploader__file') && target) {
        target = target.parentNode;
    }
    if (!target) return;

    var url = target.getAttribute('style') || '';
    var id = target.getAttribute('data-id');

    if (url) {
        url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
    }
    var gallery = iwx.gallery(url, {
        className: 'custom-name',
        onDelete: function () {
            iwx.confirm('确定删除该图片？', function () {
                --uploadCount;
                uploadCountDom.innerHTML = uploadCount;

                for (var i = 0, len = uploadList.length; i < len; ++i) {
                    var file = uploadList[i];
                    if (file.id == id) {
                        file.stop();
                        break;
                    }
                }
                target.remove();
                gallery.hide();
            });
        }
    });
});

/* 图片手动上传 */
var uploadCustomFileList = [];

// 这里是简单的调用，其余api请参考文档
iwx.uploader('#uploaderCustom', {
    url: 'http://localhost:8002/upload',
    auto: false,
    onQueued: function () {
        uploadCustomFileList.push(this);
    }
});

// 手动上传按钮
document.getElementById('uploaderCustomBtn').addEventListener('click', function () {
    uploadCustomFileList.forEach(function (file) {
        file.upload();
    });
});

// 缩略图预览
document.querySelector('#uploaderCustomFiles').addEventListener('click', function (e) {
    var target = e.target;

    while (!target.classList.contains('iwx-uploader__file') && target) {
        target = target.parentNode;
    }
    if (!target) return;

    var url = target.getAttribute('style') || '';
    var id = target.getAttribute('data-id');

    if (url) {
        url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
    }
    var gallery = iwx.gallery(url, {
        onDelete: function () {
            iwx.confirm('确定删除该图片？', function () {
                var index;
                for (var i = 0, len = uploadCustomFileList.length; i < len; ++i) {
                    var file = uploadCustomFileList[i];
                    if (file.id == id) {
                        index = i;
                        break;
                    }
                }
                if (index !== undefined) uploadCustomFileList.splice(index, 1);

                target.remove();
                gallery.hide();
            });
        }
    });
});
