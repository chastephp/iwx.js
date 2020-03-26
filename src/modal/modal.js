/*
* Tencent is pleased to support the open source community by making WeUI.js available.
*
* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
*
* Licensed under the MIT License (the "License"); you may not use this file except in compliance
* with the License. You may obtain a copy of the License at
*
*       http://opensource.org/licenses/MIT
*
* Unless required by applicable law or agreed to in writing, software distributed under the License is
* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
* either express or implied. See the License for the specific language governing permissions and
* limitations under the License.
*/

import $ from '../util/util';
import tpl from './modal.html';

let _sington;

export default function showModal (object = {}) {
    if (_sington) return _sington;

    const isAndroid = $.os.android;
    object = $.extend({
        title: null,
        content: '',
        className: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#576B95',
        success: $.noop,
        fail: $.noop,
        complete: $.noop,
        isAndroid: isAndroid
    }, object);

    const $modalWrap = $($.render(tpl, object));
    const $dialog = $modalWrap.find('.weui-dialog');
    const $mask = $modalWrap.find('.weui-mask');

    function _hide (callback) {
        _hide = $.noop; // 防止二次调用导致报错

        $mask.addClass('weui-animate-fade-out');
        $dialog
            .addClass('weui-animate-fade-out')
            .on('animationend webkitAnimationEnd', function () {
                $modalWrap.remove();
                _sington = false;
                callback && callback();
            });
    }

    function hide (callback) { _hide(callback); }

    $('body').append($modalWrap);
    // 不能直接把.weui-animate-fade-in加到$dialog，会导致mask的z-index有问题
    $mask.addClass('weui-animate-fade-in');
    $dialog.addClass('weui-animate-fade-in');

    $modalWrap
        .on('click', '.weui-dialog__btn', function () {
            const type = $(this).attr('type');
            object.success({
                confirm: type === 'confirm',
                cancel: type === 'cancel'
            });
            hide();
        })
        .on('touchmove', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        });

    _sington = $modalWrap[0];
    _sington.hide = hide;
    return _sington;
}
