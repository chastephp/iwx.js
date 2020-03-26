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
import tpl from './actionSheet.html';

let _sington;

function showActionSheet (object = {}) {
    if (_sington) return _sington;

    const isAndroid = $.os.android;
    object = $.extend({
        itemList: [],
        itemColor: '#000000',
        title: '',
        className: '',
        isAndroid: isAndroid,
        success: $.noop,
        fail: $.noop,
        complete: $.noop
    }, object);
    const $actionSheetWrap = $($.render(tpl, object));
    const $actionSheet = $actionSheetWrap.find('.weui-actionsheet');
    const $actionSheetMask = $actionSheetWrap.find('.weui-mask');

    function _hide (callback) {
        _hide = $.noop; // 防止二次调用导致报错

        $actionSheet.addClass(object.isAndroid ? 'weui-animate-fade-out' : 'weui-animate-slide-down');
        $actionSheetMask
            .addClass('weui-animate-fade-out')
            .on('animationend webkitAnimationEnd', function () {
                $actionSheetWrap.remove();
                _sington = false;
                callback && callback();
            });
    }

    function hide (callback) { _hide(callback); }

    $('body').append($actionSheetWrap);

    // 这里获取一下计算后的样式，强制触发渲染. fix IOS10下闪现的问题
    $.getStyle($actionSheet[0], 'transform');

    $actionSheet.addClass(object.isAndroid ? 'weui-animate-fade-in' : 'weui-animate-slide-up');
    $actionSheetMask
        .addClass('weui-animate-fade-in')
        .on('click', function () { hide(); });
    $actionSheetWrap.find('.weui-actionsheet__menu').on('click', '.weui-actionsheet__cell', function () {
        const index = $(this).index();
        object.success({
            tapIndex: index
        });
        hide();
    });

    _sington = $actionSheetWrap[0];
    _sington.hide = hide;
    return _sington;
}

export default showActionSheet;
