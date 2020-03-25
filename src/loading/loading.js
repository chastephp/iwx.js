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
import tpl from './loading.html';

let _sington;

export function showLoading (object = {}) {
    if (_sington) return _sington;

    object = $.extend({
        title: '',
        className: '',
        success: $.noop
    }, object);

    const $loadingWrap = $($.render(tpl, object));
    const $loading = $loadingWrap.find('.weui-toast');
    const $mask = $loadingWrap.find('.weui-mask');

    $('body').append($loadingWrap);
    $loading.addClass('weui-animate-fade-in');
    $mask.addClass('weui-animate-fade-in');
    object.success();
    _sington = $loadingWrap[0];
    return _sington;
}

export function hideLoading (object = {}) {
    object = $.extend({
        success: $.noop
    }, object);

    if (_sington) {
        const $loadingWrap = $(_sington);
        const $loading = $loadingWrap.find('.weui-toast');
        const $mask = $loadingWrap.find('.weui-mask');

        $mask.addClass('weui-animate-fade-out');
        $loading
            .addClass('weui-animate-fade-out')
            .on('animationend webkitAnimationEnd', function () {
                $loadingWrap.remove();
                _sington = false;
                object.success();
            });
    }
}
