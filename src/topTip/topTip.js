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
import tpl from './topTip.html';

let _toptip = null;

function showTopTip (object = {}) {
    object = $.extend({
        content: '',
        duration: 3000,
        success: $.noop,
        fail: $.noop,
        complete: $.noop,
        className: ''
    }, object);

    const $topTip = $($.render(tpl, object));

    function _hide (callback) {
        _hide = $.noop; // 防止二次调用导致报错

        $topTip.remove();
        callback && callback();
        object.success();
        _toptip = null;
    }

    function hide (callback) { _hide(callback); }

    $('body').append($topTip);
    if (_toptip) {
        clearTimeout(_toptip.timeout);
        _toptip.hide();
    }

    _toptip = {
        hide: hide
    };
    _toptip.timeout = setTimeout(hide, object.duration);

    $topTip[0].hide = hide;
    return $topTip[0];
}

export default showTopTip;
