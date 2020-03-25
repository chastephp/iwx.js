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
import tpl from './toast.html';

let _sington;

export function showToast (object = {}) {
    if (_sington) return _sington;

    object = $.extend({
        title: '',
        icon: 'success', // none,loading
        duration: 1500,
        success: $.noop,
        fail: $.noop,
        complete: $.noop,
        className: ''
    }, object);

    object.icon = {success: 'weui-icon-success-no-circle', loading: 'weui-loading', none: ''}[object.icon] || '';

    const $toastWrap = $($.render(tpl, object));
    const $toast = $toastWrap.find('.weui-toast');
    const $mask = $toastWrap.find('.weui-mask');

    $('body').append($toastWrap);
    $toast.addClass('weui-animate-fade-in');
    $mask.addClass('weui-animate-fade-in');

    setTimeout(() => {
        $mask.addClass('weui-animate-fade-out');
        $toast
            .addClass('weui-animate-fade-out')
            .on('animationend webkitAnimationEnd', function () {
                $toastWrap.remove();
                _sington = false;
                object.success();
            });
    }, object.duration);

    _sington = $toastWrap[0];

    return $toastWrap[0];
}

export function hideToast (object = {}) {
    object = $.extend({
        success: $.noop
    }, object);

    if (_sington) {
        const $toastWrap = $(_sington);
        const $toast = $toastWrap.find('.weui-toast');
        const $mask = $toastWrap.find('.weui-mask');

        $mask.addClass('weui-animate-fade-out');
        $mask.addClass('weui-animate-fade-out');
        $toast
            .addClass('weui-animate-fade-out')
            .on('animationend webkitAnimationEnd', function () {
                $toastWrap.remove();
                _sington = false;
                object.success();
            });
    }
}
