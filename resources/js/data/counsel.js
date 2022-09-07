// counselType
// inqType
// applicantCompany
// applicantName
// applicantContact
// email
// applicantSex
// applicantAge
// applicantJob
// applicantResid
// desiredCategory
// social
let errorList = []; //only index
let cnsDatas = {}; // ajax data
/**
 * 텍스트주면 alert시킴
 * @param text alert시킬 문자
 */
const alertError = (text) => alert(text);

/**
 * validation하고 문제 없으면 데이터 담김
 */
const validAndMakecnsDatas = () => {
    inputList.map(input => confirmInput(input));
    radioList.map(radio => confirmRadio(radio));
    selectionList.map(sel => confirmSelection(sel));
    chkBoxList.map(chk => confirmChkbox(chk));
}

/**
 * validation에러가 있을때 동작하며 우선순위가 가장 먼저인 에러만 띄움
 */
const occurErrors = () => {
    errorList.sort((d1, d2) => d1.err_order - d2.err_order);
    alertError(errorMsgList[errorList[0].err_order]);
    $(`[name=${errorList[0].name}]`).focus();
    console.log(errorList);
    errorList = [];
}

/**
 * input 검사
 * @param name - tag에 들어가는 이름
 * @param err_order - 에러로 띄우는 순서
 * @param require boolean - false면 validation 안하고 건너뜀
 */
const confirmInput = ({name, err_order, require}) => {
    cnsDatas[`${name}`] = $(`input:text[name=${name}]`).val();
    if (require && !cnsDatas[name]) errorList.push({name, err_order});
}

/**
 * radio 검사
 * @param name - tag에 들어가는 이름
 * @param err_order - 에러로 띄우는 순서
 */
const confirmRadio = ({name, err_order}) => {
    const radio = $(`input:radio[name=${name}]`);
    if (name == 'agree') {
        if (!radio.eq(0).is(':checked'))
            errorList.push({name, err_order});
    } else {
        radio.map((i, m) => {
            if ($(m).is(':checked')) {
                cnsDatas[name] = i + 1
            }
        });
        if (!cnsDatas[name]) errorList.push({name, err_order});
    }
}

/**
 * confirm 검사
 * @param name - tag에 들어가는 이름
 * @param err_order - 에러로 띠우는 순서
 * @param least - 체크박스 최소값 validation
 * @param max - 체크박스 최대값 validation
 */
const confirmChkbox = ({name, err_order, least, max}) => {
    const chk = $(`input:checkbox[name=${name}]`);
    let checkedItems = [];
    chk.map((i, item) => {
        if ($(item).is(':checked')) {
            checkedItems.push({name: $(item).attr('title'), index: i});
        }
    });
    if (checkedItems.length < least || checkedItems.length > max) {
        errorList.push({name, err_order});
    } else {
        cnsDatas[name] = '';
        checkedItems.map((item, i) => {
            cnsDatas[name] += item.name;
            if (checkedItems.length - 1 != i) {
                cnsDatas[name] += ','
            }
        });
    }
};

/**
 * selection 검사
 * @param name - tag에 들어가는 이름
 * @param err_order - 에러로 띄우는 순서
 */
const confirmSelection = ({name, err_order}) => {
    cnsDatas[name] = $(`select[name=${name}]`).val();
    if (!cnsDatas[name]) {
        errorList.push({name, err_order});
    }
}

/**
 * 상담신청 버튼 눌렀을때 동작(onclick 속성을 사용)
 * @param type - type에 따라서 상담신청이 변경 될 수 있음(현재: 'MC', 'PA')
 */
const onClickSubmit = (type) => {
    validAndMakecnsDatas();

    if (errorList.length != 0) {
        occurErrors();
    } else {
        cnsDatas['counselType'] = type;
        const {email1, email2, ...etcDats} = cnsDatas;
        onClickCounsel({
            email: email1 + '@' + email2,
            ...etcDats
        });
    }
};

/**
 * 상담신청 ajax 통신
 * @param data 받아서 던질 데이터
 * @returns {*|jQuery} POST /counsel
 */
const onClickCounsel = (data) => $.ajax({
    url: "/counsel",
    type: "post",
    data,
    success: function () {
        alert('완료되었습니다');
        window.location.reload();
    },
    error: function () {
        alert('실패했습니다. 관리자에게 문의해주세요');
    }
});

