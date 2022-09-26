const datas = {
    "ct_pet": [{
        "name": "맞춤 사료 10팩",
        "salePrice": 12900,
        "yield": 35
    }, {
        "name": "강아지 구강영양제 30매",
        "salePrice": 27000,
        "yield": 20
    }, {
        "name": "펫매트 8종택1",
        "salePrice": 168000,
        "yield": 8
    }, {
        "name": "강아지 유모차",
        "salePrice": 212000,
        "yield": 24
    }, {
        "name": "원목 캣 타워",
        "salePrice": 167700,
        "yield": 18
    }]
    ,
    "ct_food": [
        {
            "name": "즉석 파대창150g 3팩",
            "salePrice": 17800,
            "yield": 45
        },
        {
            "name": "만두전골밀키트 2인",
            "salePrice": 19500,
            "yield": 20
        },
        {
            "name": "제주 돈마호크 340g + 흑돈 250g",
            "salePrice": 19900,
            "yield": 20
        },
        {
            "name": "직화오리 160g 6팩",
            "salePrice": 23500,
            "yield": 25
        },
        {
            "name": "총각김치 5kg",
            "salePrice": 42900,
            "yield": 10
        }
    ],
    "ct_health": [
        {
            "name": "홍삼 50ml * 30포",
            "salePrice": 29000,
            "yield": 13
        },
        {
            "name": "어린이 홍삼젤리50P",
            "salePrice": 42000,
            "yield": 17
        },
        {
            "name": "루테인 지아잔틴 30일분",
            "salePrice": 10230,
            "yield": 20
        },
        {
            "name": "상황버섯추출액 1box",
            "salePrice": 67800,
            "yield": 20
        },
        {
            "name": "다이어트 슬림 900mg x 180정 2박스(4개월분)",
            "salePrice": 54900,
            "yield": 15
        }
    ],
    "ct_kitchen": [
        {
            "name": "에어프라이어 7L",
            "salePrice": 189000,
            "yield": 40
        },
        {
            "name": "고속블렌드",
            "salePrice": 159000,
            "yield": 35
        },
        {
            "name": "매직 그릴",
            "salePrice": 28200,
            "yield": 13
        },
        {
            "name": "토스터기",
            "salePrice": 23200,
            "yield": 13
        },
        {
            "name": "빌트인 3구인덕션",
            "salePrice": 659000,
            "yield": 15
        }
    ],
    "ct_interior": [
        {
            "name": "극세사 이불Q 세트",
            "salePrice": 91600,
            "yield": 14
        },
        {
            "name": "쿨매트",
            "salePrice": 28400,
            "yield": 15
        },
        {
            "name": "블랭킷",
            "salePrice": 55000,
            "yield": 20
        },
        {
            "name": "라텍스 ",
            "salePrice": 443500,
            "yield": 17
        },
        {
            "name": "기능성베개(경추베개)",
            "salePrice": 41300,
            "yield": 10
        }
    ]
};

let currentStep = 1;

const result = {
    step1: 'ct_pet',
    step2: [],
    step3: [],
    calcResult: {}
};
const moneyWithComma = (m) => new Intl.NumberFormat().format(m);

const step1Reset = () => {
    result.step1 = 'ct_pet';
    document.getElementById('ct_pet').checked = true;
    $('.step_wrap li').eq(0).addClass('active');
};

const step2Reset = () => {
    $('.step2 input').map((i, item) => {
        $(item).prop("checked", false);
    });
};

const step3Reset = () => {};

const sidebarReset = () => {
    $('.step_wrap li').eq(0).addClass('active');
    $('.step_wrap li').eq(1).removeClass('active');
    $('.step_wrap li').eq(2).removeClass('active');
};

const init = () => {
    // datas init
    currentStep = 1;
    result.step2 = [];
    result.step3 = [];
    result.calcResult = {};
    $('.step3 .txt_item').remove();
    $('.step1').show();
    $('.step2, .step3, .modal .result_wrap').hide(); /* 20220822 수정 ksk */
    $('.simulation_wrap').show();

    step1Reset();
    step2Reset();
    // step3Reset();
    sidebarReset();
};


// 최종값 계산
const calculateFinalIncome = () => {
    let totalPrice = 0;
    result.step2.map((selectedItem, i) => {
        totalPrice += Math.floor(selectedItem.salePrice * selectedItem.yield * result.step3[i] * 0.01);
    });
    const pricesMarkup = $('.list_wrap .total');
    const baseMargin = Math.floor(totalPrice * 0.1);
    pricesMarkup.eq(0).html(moneyWithComma(baseMargin) + '<em>원</em>');
    pricesMarkup.eq(1).html(moneyWithComma(baseMargin * 2) + '<em>원</em>');
    pricesMarkup.eq(2).html(moneyWithComma(baseMargin * 3) + '<em>원</em>');
}

// 이전버튼
const onClickBtnPrev = () => {
    if (currentStep == 1) return;
    result.step2 = [];
    result.step3 = [];
    $('.step3 .txt_item').remove();
    $(`.step${currentStep}`).hide();
    $('.step_wrap li').eq(currentStep - 1).removeClass('active');
    if (currentStep <= 3) {
        currentStep -= 1;
        $(`.step${currentStep}`).show();
        $('.step_wrap li').eq(currentStep - 1).addClass('active');
    }
};

const onClickBtnNext = () => {
    switch (currentStep) {
        case 1:
            datas[result[`step1`]].map((item, index) => {
                $('.pd_name').eq(index).html(item.name);
                $('.pd_price').eq(index).html(moneyWithComma(item.salePrice) + '<span> 원</span>');
                $('.pd_yeild').eq(index).html(item.yield)
            });
            break;
        case 2:
            $('.step2 input').map((i, item) => {
                if ($(item).prop('checked')) {
                    result.step2.push(datas[result['step1']][i]);
                }
            });
            if (result.step2.length == 0) {
                alert('상품을 선택해 주세요.')
                return false;
            }
            let itemsHtml = '';
            result.step2.map((item, idx) => {
                itemsHtml += '<div class=\'txt_item\'>';
                itemsHtml += `     <label for='ref0${idx + 1}'>`;
                itemsHtml += `         <span class='pd_name'>${item.name}</span>`;
                itemsHtml += `         <input onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" type='text' id='ref0${idx + 1}' maxlength="4" name='ref_item'>`;
                itemsHtml += '         <span>명</span>';
                itemsHtml += '     </label>';
                itemsHtml += '</div>';
            });
            $('.step3 .item_wrap').append(itemsHtml);
            break;
        case 3:
            const checkedItems = $('input[name="ref_item"]');
            for (let i = 0; i < checkedItems.length; i++) {
                if (checkedItems.eq(i).val() == '') {
                    alert('인원수가 비어있습니다.');
                    return false;
                }
                result.step3.push(checkedItems.eq(i).val());
            }
            calculateFinalIncome();
            break;
    }
    return true;
};

// 코니아MC 체험하기 버튼
$('.btn_pop.mc').on('click', init);

// 다음버튼
$('.simulation_wrap .btn_next').on('click', () => {
    if(!onClickBtnNext()) return;
    $(`.step${currentStep}`).hide();
    $('.step_wrap li').eq(currentStep - 1).removeClass('active');
    if (currentStep < 3) {
        currentStep += 1;
        $(`.step${currentStep}`).show();
        $('.step_wrap li').eq(currentStep - 1).addClass('active');
    } else {
        $('.simulation_wrap').hide();
        $('.result_wrap').show();
    }
});

// 이전버튼
$('.simulation_wrap .btn_prev').on('click',onClickBtnPrev);

// 최종결과 처음부터 다시하기
$('.income .btn_prev').on('click', init);

$('.mc .btn_close_mc').on('click', () => {
    $('.modal.mc').hide();
    $('html, body').removeClass('locked');
});


Object.keys(datas).map(id => {
    $(`#${id}`).on('change', function () {
        result.step1 = id;
    });
});
