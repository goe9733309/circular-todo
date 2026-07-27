(function (global) {
  "use strict";

  var LANG_KEY = "roundClock_lang";

  var dict = {
    ko: {
      nav: {
        clock: "🕐 시계",
        intro: "ℹ️ 소개",
        guide: "📖 사용법",
        examples: "💡 예시",
        langToggle: "🌐 English",
        export: "⬇️ 내보내기",
        exportImage: "🖼️ 이미지로 저장",
        exportPdf: "📄 PDF로 저장",
        exportImageFull: "🖼️ 이미지로 저장 (제목+시간 포함)",
        exportPdfFull: "📄 PDF로 저장 (제목+시간 포함)",
        exportHtml: "🌐 HTML로 내보내기 (살아있는 시계)",
        exportWidget: "🖥️ Windows 위젯 (작업 예정)"
      },
      footer: {
        privacy: "개인정보처리방침",
        contact: "문의하기",
        copyright: "© 2026 둥근 24시간 시간표"
      },
      common: {
        tryNow: "지금 사용해보기 →",
        createNow: "지금 만들어보기 →",
        viewGuide: "사용법 보기",
        viewExamples: "예시 보기",
        backToClock: "시계로 돌아가기 →"
      },
      intro: {
        pageTitle: "소개 - 둥근 24시간 시간표",
        description: "둥근 24시간 시간표 소개: 하루를 원형 시계 위 색깔 밴드로 표현해 지금 이 순간의 하루 리듬을 한눈에 보여주는 도구입니다.",
        h1: "🕐 둥근 24시간 시간표",
        tagline: "하루 24시간을 원형 시계 위에 펼쳐놓고, 한눈에 오늘의 리듬을 보는 시간표입니다.",
        heroAlt: "예시 시계 미리보기",
        introParagraph: "보통의 목록형 일정표는 하루가 얼마나 남았는지, 지금이 하루의 어느 지점인지 직관적으로 와닿지 않습니다. 이 시간표는 24시간을 하나의 원으로 표현해서, 등교·업무·운동·휴식 같은 하루의 일정이 시계 위에 색깔 있는 밴드로 나란히 놓이고, 지금 이 순간을 가리키는 시침이 그 위를 지나갑니다.",
        featuresHeading: "주요 기능",
        feature1Title: "드래그로 빠르게 추가",
        feature1Desc: "시계판의 빈 곳을 드래그하면 시작·종료 시각이 10분 단위로 자동 입력됩니다.",
        feature2Title: "10가지 색상 팔레트",
        feature2Desc: "일정마다 뚜렷하게 구분되는 색을 골라, 한눈에 하루의 구성을 파악할 수 있습니다.",
        feature3Title: "다크모드 지원",
        feature3Desc: "시스템 설정을 따르거나, 라이트/다크를 직접 선택할 수 있습니다.",
        feature4Title: "알람 & 브라우저 알림",
        feature4Desc: "일정 시작 또는 종료 시각에 소리와 알림으로 알려줍니다.",
        feature5Title: "자유로운 커스터마이징",
        feature5Desc: "시계판 모양(도넛·얇은 밴드·파이·아웃라인), 글꼴, 라벨 위치·회전·크기까지 조절합니다.",
        feature6Title: "간편한 삭제",
        feature6Desc: "목록에서, 또는 시계 위 일정에 마우스를 올려 바로 삭제할 수 있습니다.",
        tip: "💡 모든 일정은 이 브라우저에만 저장되며, 매일 자정이 지나면 새로 시작됩니다. 서버에 전송되지 않아요.",
        demoTitles: ["기상 · 준비", "오전 업무", "점심", "오후 업무", "운동", "휴식"]
      },
      guide: {
        pageTitle: "사용법 - 둥근 24시간 시간표",
        description: "둥근 24시간 시간표 사용법: 일정 추가·삭제, 라벨 위치 조절, 표시 설정, 알람 기능까지 단계별로 안내합니다.",
        h1: "📖 사용법",
        tagline: "둥근 24시간 시간표의 모든 기능을 순서대로 안내합니다.",
        h2_1: "1. 일정 추가하기",
        h3_1a: "방법 A · 직접 입력하기",
        step1_1: "<span class=\"key\">시작 시각</span>과 <span class=\"key\">종료 시각</span>을 입력합니다.",
        step1_2: "<span class=\"key\">할 일</span> 칸에 이름을 적습니다. (예: 운동)",
        step1_3: "원하는 <span class=\"key\">색상</span> 스와치를 고르거나, 맨 끝의 동그란 버튼으로 직접 색을 지정합니다.",
        step1_4: "필요하면 <span class=\"key\">알람 설정</span>을 켜고, 시작/종료 시각 중 언제 울릴지 고릅니다.",
        step1_5: "<span class=\"key\">추가</span> 버튼을 누르면 시계 위에 밴드가 생깁니다.",
        h3_1b: "방법 B · 시계판에서 드래그하기",
        step2_1: "아직 일정이 없는 <b>빈 시계판 위</b>를 마우스로 누른 채 원하는 방향으로 드래그합니다.",
        step2_2: "손을 놓으면 <span class=\"key\">시작 시각</span> / <span class=\"key\">종료 시각</span>이 10분 단위로 반올림되어 자동으로 채워지고, 선택한 영역은 점선 밴드로 계속 표시됩니다.",
        step2_3: "마음에 들지 않으면 밴드 바깥의 <span class=\"key\">✕</span> 표시를 눌러 취소할 수 있습니다.",
        step2_4: "새로 드래그하면 이전 영역은 자동으로 대체됩니다.",
        step2_5: "<span class=\"key\">할 일</span> 이름을 입력하고 <span class=\"key\">추가</span>를 누르면 정식 일정으로 등록됩니다.",
        tip1: "💡 이미 일정이 있는 자리를 클릭하면 그 일정의 툴팁이나 이동/회전 손잡이가 우선 동작하므로, 드래그로 새 일정을 만들 때는 빈 공간에서 시작하세요.",
        h2_2: "2. 일정 삭제하기",
        step3_1: "왼쪽 <b>오늘의 할 일 목록</b>에서 해당 항목의 <span class=\"key\">삭제</span> 버튼을 누릅니다.",
        step3_2: "또는 시계 위 일정 라벨에 마우스를 올리면 나타나는 <span class=\"key\">✕</span> 버튼을 눌러도 바로 삭제됩니다.",
        h2_3: "3. 라벨 위치·모양 바꾸기",
        p3: "시계 위 일정 이름(라벨)에 마우스를 올리면 손잡이가 나타납니다.",
        step4_1: "라벨을 직접 <b>드래그</b>하면 위치를 옮길 수 있습니다.",
        step4_2: "<span class=\"key\">↻</span> 손잡이를 드래그하면 글자가 회전합니다.",
        step4_3: "<span class=\"key\">↕</span> 손잡이를 드래그하면 글자 크기가 커지거나 작아집니다.",
        step4_4: "손잡이를 <b>더블클릭</b>하면 각각 원래 위치·각도·크기로 되돌아갑니다.",
        h2_4: "4. 표시 설정",
        p4: "<b>표시 설정</b> 카드를 펼치면 시계의 생김새를 바꿀 수 있습니다.",
        card1Title: "화면 테마",
        card1Desc: "시스템 설정 따르기 / 라이트 / 다크 중에서 고를 수 있습니다.",
        card2Title: "시계판 모양",
        card2Desc: "도넛형(기본) · 얇은 밴드형 · 파이형 · 아웃라인형 네 가지 스타일이 있습니다.",
        card3Title: "시계 글자 폰트",
        card3Desc: "고딕체부터 손글씨, 붓글씨 느낌까지 다양한 글꼴로 바꿀 수 있습니다.",
        card4Title: "시계 제목 · 상단 표시",
        card4Desc: "시계 위쪽에 제목을 적고, 시간/제목/둘 다 중 무엇을 보여줄지 정합니다.",
        card5Title: "밴드 두께 · 글자 크기",
        card5Desc: "슬라이더로 일정 밴드의 두께와 할 일 글자, 제목, 시간 글자 크기를 조절합니다.",
        h2_5: "5. 알람 & 브라우저 알림",
        step5_1: "일정을 추가할 때 <span class=\"key\">알람 설정</span>을 켜면, 시작 또는 종료 시각에 알려줍니다.",
        step5_2: "처음 열면 상단에 <b>\"알람을 받으려면 알림을 허용해주세요\"</b> 배너가 뜹니다. <span class=\"key\">허용하기</span>를 누르면 브라우저 알림으로, 허용하지 않으면 화면 안 토스트 메시지와 소리로 알려줍니다.",
        h2_6: "6. 데이터는 어디에 저장되나요?",
        tip2: "💾 모든 일정과 설정은 <b>이 브라우저에만</b> 저장됩니다(서버 전송 없음). 날짜가 바뀌면 그날의 일정은 자동으로 새로 시작되고, 다른 기기나 다른 브라우저와는 동기화되지 않습니다."
      },
      examples: {
        pageTitle: "예시 - 둥근 24시간 시간표",
        description: "학생, 직장인, 운동 루틴 등 세 가지 예시로 둥근 24시간 시간표를 하루 일과에 활용하는 방법을 보여줍니다.",
        h1: "💡 이렇게 활용해보세요",
        tagline: "누가, 어떤 하루를 시계 위에 올려두는지 세 가지 예시로 살펴봅니다. 시각과 색만 바꾸면 여러분의 하루에도 그대로 적용할 수 있어요.",
        persona1Title: "📚 학생의 하루",
        persona1Alt: "학생 시간표 예시",
        persona1Desc: "등교부터 자습, 숙제까지 이어지는 하루를 색으로 나누면, \"오늘 공부에 시간을 얼마나 썼는지\"가 한눈에 보입니다. 22시 이후 빈 시계판은 취침 시간이에요.",
        persona2Title: "💼 직장인의 하루",
        persona2Alt: "직장인 시간표 예시",
        persona2Desc: "업무·회의·점심·개인 시간을 구분해두면, 회의가 몰린 날인지 여유 있는 날인지 시계 모양만 봐도 알 수 있습니다.",
        persona3Title: "🏃 운동 루틴",
        persona3Alt: "운동 루틴 시간표 예시",
        persona3Desc: "아침 러닝과 저녁 근력 운동처럼 규칙적으로 반복하고 싶은 루틴을 색으로 고정해두면, 매일 같은 시간에 알람으로 챙길 수 있어요.",
        h2: "내 하루에 적용하려면",
        step1: "위 예시 중 비슷한 생활 패턴을 하나 고릅니다.",
        step2: "<a href=\"index.html\">시계 페이지</a>를 열고, 예시의 시작·종료 시각과 이름을 그대로 입력해봅니다.",
        step3: "범주별로 같은 색을 반복해서 쓰면(예: 업무는 항상 파랑, 운동은 항상 빨강) 나중에 봤을 때 더 빠르게 읽힙니다.",
        step4: "자세한 입력 방법은 <a href=\"guide.html\">사용법 페이지</a>를 참고하세요.",
        studentTitles: ["기상 · 등교 준비", "등교", "학교 수업", "방과 후 자습", "저녁 식사", "숙제", "자유 시간"],
        workerTitles: ["출근 준비 · 이동", "오전 업무", "점심", "회의", "오후 업무", "저녁 식사", "운동", "개인 시간"],
        fitnessTitles: ["기상 스트레칭", "아침 러닝", "아침 식사", "업무", "근력 운동", "마무리 스트레칭", "저녁 식사", "독서 · 휴식"]
      },
      auth: {
        menuSignIn: "로그인",
        menuSynced: "동기화 중",
        signInGoogle: "🔑 Google로 로그인",
        signOut: "↩️ 로그아웃",
        statusGuest: "지금은 이 브라우저에만 저장됩니다.",
        statusSynced: "변경 내용이 계정에 저장됩니다.",
        statusSyncing: "동기화 중…",
        privacyNote: "로그인하면 일정이 계정에 저장되어 다른 기기에서도 볼 수 있습니다. 로그인하지 않으면 이 브라우저에만 저장됩니다.",
        privacyLink: "개인정보처리방침",
        importPrompt: "☁️ 이 브라우저에 저장된 {count}일치 일정을 계정으로 가져올까요?",
        importBtn: "가져오기",
        importDoneTitle: "가져오기 완료",
        importDoneBody: "이 브라우저의 일정을 계정에 저장했습니다.",
        importErrorBody: "가져오기에 실패했습니다. 다시 시도해주세요.",
        syncErrorTitle: "동기화 실패",
        syncErrorBody: "변경 내용은 이 브라우저에 저장되어 있습니다. 잠시 후 다시 시도합니다.",
        pullErrorBody: "저장된 일정을 불러오지 못했습니다. 이 브라우저의 데이터를 계속 사용합니다.",
        signInErrorTitle: "로그인 실패",
        signInErrorBody: "로그인을 시작할 수 없습니다. 잠시 후 다시 시도해주세요."
      },
      privacy: {
        pageTitle: "개인정보처리방침 - 둥근 24시간 시간표",
        description: "둥근 24시간 시간표 사이트의 개인정보처리방침. 저장되는 데이터, 쿠키, Google 애드센스 광고 이용에 대해 안내합니다.",
        h1: "🔒 개인정보처리방침",
        tagline: "둥근 24시간 시간표(이하 \"이 사이트\")가 방문자의 정보를 어떻게 다루는지 안내합니다.",
        h2_1: "1. 사이트에서 저장하는 데이터",
        h3_1_local: "1-1. 로그인하지 않고 사용하는 경우 (기본)",
        p1: "로그인하지 않으면 이 사이트에서 입력하는 일정, 색상, 표시 설정 등은 모두 <b>방문자의 브라우저(localStorage)</b>에만 저장됩니다. 이 사이트를 운영하는 서버로 전송되거나 별도의 데이터베이스에 수집·저장되지 않으며, 브라우저 저장 공간을 비우거나 다른 기기·다른 브라우저로 접속하면 해당 데이터는 함께 이동하지 않습니다.",
        h3_1_cloud: "1-2. 로그인하고 사용하는 경우 (선택)",
        p1_cloud: "여러 기기에서 같은 시간표를 보고 싶다면 <b>선택적으로</b> Google 계정으로 로그인할 수 있습니다. 이 경우에만 아래 데이터가 클라우드 데이터베이스 서비스인 <a href=\"https://supabase.com/privacy\" target=\"_blank\" rel=\"noopener\">Supabase</a>에 저장되어 계정과 연결됩니다. 로그인은 전적으로 선택 사항이며, 로그인하지 않으면 아무것도 브라우저 밖으로 나가지 않습니다.",
        li1_1: "날짜별 일정(제목, 시간, 색상, 알람 설정)과 일지에 작성한 내용",
        li1_2: "표시 설정(테마, 시계 모양·크기, 바늘·제목·라벨 설정, 일지 글꼴과 단 수, 언어)",
        li1_3: "로그인에 사용한 Google 계정의 이메일 주소와 기본 프로필 정보(계정 식별용)",
        li1_4: "이 사이트는 비밀번호를 받거나 저장하지 않습니다. 로그인 처리는 Google과 Supabase가 담당합니다.",
        li1_5: "저장된 데이터는 본인 계정으로만 조회할 수 있으며, 로그아웃하면 이후 변경 사항은 다시 이 브라우저에만 저장됩니다.",
        li1_6: "계정과 저장된 데이터의 삭제를 원하시면 아래 문의 메일로 요청해주세요.",
        h2_2: "2. 쿠키와 Google 애드센스",
        p2: "이 사이트는 Google 애드센스(Google AdSense)를 통해 광고를 게재합니다. Google을 비롯한 제3자 공급업체는 쿠키(예: DART 쿠키)를 사용하여 방문자가 이 사이트 또는 다른 사이트를 방문한 기록을 바탕으로 광고를 게재할 수 있습니다.",
        li2_1: "Google이 광고 쿠키를 사용하는 방식은 <a href=\"https://policies.google.com/technologies/ads\" target=\"_blank\" rel=\"noopener\">Google 광고 정책 페이지</a>에서 확인할 수 있습니다.",
        li2_2: "맞춤 광고 게재를 원하지 않는 경우 <a href=\"https://adssettings.google.com/\" target=\"_blank\" rel=\"noopener\">Google 광고 설정</a> 또는 <a href=\"https://www.aboutads.info/choices/\" target=\"_blank\" rel=\"noopener\">aboutads.info</a>에서 선택 해제할 수 있습니다.",
        h2_3: "3. 제3자가 수집하는 정보",
        p3: "이 사이트에 접속하면 호스팅·광고·인증 서비스 제공업체(예: Cloudflare Pages, Google, Supabase)가 표준적인 접속 로그(브라우저 종류, 대략적인 지역, 방문 페이지 등)를 자체적으로 수집할 수 있습니다. 이는 이 사이트 운영자가 직접 수집·보관하는 정보가 아니며, 각 서비스 제공업체의 개인정보처리방침을 따릅니다.",
        h2_4: "4. 아동 개인정보",
        p4: "이 사이트는 만 14세 미만 아동을 대상으로 개인정보를 의도적으로 수집하지 않습니다.",
        h2_5: "5. 문의",
        p5: "이 개인정보처리방침에 대해 궁금한 점이 있다면 <a href=\"mailto:goe9733309@gmail.com\">goe9733309@gmail.com</a>으로 문의해주세요.",
        h2_6: "6. 정책 변경",
        p6: "이 개인정보처리방침은 필요에 따라 업데이트될 수 있으며, 변경 사항은 이 페이지에 반영됩니다.",
        lastUpdated: "최종 업데이트: 2026년 7월 28일"
      },
      app: {
        pageTitle: "둥근 24시간 시간표",
        description: "하루 24시간을 원형 시계 위에 색깔 있는 밴드로 펼쳐서 보여주는 무료 온라인 시간표. 드래그로 일정을 추가하고, 알람과 다크모드를 지원합니다.",
        todoListHeading: "오늘의 할 일 목록",
        todayBtn: "오늘",
        dateInputAria: "날짜 선택",
        pastDateNotice: "지난 날짜의 할 일은 추가하거나 삭제할 수 없습니다.",
        notifBannerText: "🔔 알람을 받으려면 알림을 허용해주세요",
        notifAllow: "허용하기",
        notifClose: "닫기",
        displaySettings: "표시 설정",
        themeLabel: "화면 테마",
        themeSystem: "시스템 설정 따르기",
        themeLight: "라이트",
        themeDark: "다크",
        clockStyleLabel: "시계판 모양",
        styleDonut: "도넛형 (기본)",
        styleThin: "얇은 밴드형",
        stylePie: "파이형",
        styleOutline: "아웃라인형",
        fontLabel: "시계 글자 폰트",
        fontNotoSans: "고딕 - Noto Sans KR",
        fontNanumGothic: "고딕 - Nanum Gothic",
        fontGowunDodum: "고운 고딕 - Gowun Dodum",
        fontJua: "둥근 고딕 - Jua",
        fontBlackHan: "임팩트 고딕 - Black Han Sans",
        fontGowunBatang: "바탕체 - Gowun Batang",
        fontNanumMyeongjo: "명조체 - Nanum Myeongjo",
        fontGaegu: "손글씨 - Gaegu",
        fontNanumPen: "손글씨 - Nanum Pen Script",
        fontSingleDay: "손글씨 - Single Day",
        fontNanumBrush: "붓글씨 - Nanum Brush Script",
        fontHiMelody: "손글씨 - Hi Melody",
        titleInputLabel: "시계 제목",
        titleInputPlaceholder: "예: 새 계획표",
        handShapeLabel: "바늘 모양",
        handShapeBar: "막대형 (기본)",
        handShapeArrow: "화살표형",
        handShapeDiamond: "다이아몬드형",
        handShapeTaper: "물방울형",
        handThicknessLabel: "바늘 두께",
        showTopLabel: "상단에 표시",
        showTime: "시간",
        showTitle: "제목",
        showBoth: "둘다",
        clockSizeLabel: "시계 크기",
        bandThickness: "밴드 두께",
        labelFontSize: "할 일 글자",
        titleFontSize: "제목 크기",
        timeFontSize: "시간 크기",
        hintText: "라벨을 드래그해 위치 이동, 손잡이(↻회전 · ↕크기) 조절, 더블클릭 리셋.",
        scheduleHeading: "시간 설정",
        importDateLabel: "다른 날짜에서 불러오기",
        importBtn: "불러오기",
        importNeedDate: "불러올 날짜를 선택해 주세요.",
        importSameDate: "지금 보고 있는 날짜와 같은 날짜예요.",
        importEmpty: "선택한 날짜에는 저장된 할 일이 없습니다.",
        startTimeLabel: "시작 시각",
        endTimeLabel: "종료 시각",
        taskLabel: "할 일",
        taskPlaceholder: "예: 운동",
        colorLabel: "색상",
        alarmLabel: "알람 설정",
        alarmAtStart: "시작 시각에 울림",
        alarmAtEnd: "종료 시각에 울림",
        addBtn: "추가",
        defaultTitle: "새 계획표",
        customColorTitle: "직접 선택",
        emptyList: "등록된 할 일이 없습니다.",
        completeAria: "완료 표시",
        deleteBtn: "삭제",
        alarmFlagStart: "시작",
        alarmFlagEnd: "종료",
        errorNeedTimes: "시작 시각과 종료 시각을 모두 입력해 주세요.",
        errorNeedTitle: "할 일 이름을 입력해 주세요.",
        errorEndBeforeStart: "종료 시각은 시작 시각보다 늦어야 합니다.",
        alarmBody: "{start} - {end} ({trigger} 시각 알림)",
        exampleWakeUp: "기상",
        exampleMorningExercise: "아침 운동",
        comingSoonTitle: "Windows 위젯",
        comingSoonBody: "곧 만나보실 수 있어요!",
        exportingToast: "내보내는 중...",
        exportErrorTitle: "내보내기 오류",
        exportErrorToast: "내보내기에 실패했습니다.",
        journalHeading: "저널",
        journalPlaceholder: "오늘 하루를 기록해보세요...",
        journalBgPickerAria: "배경 선택",
        journalBgBlank: "공백",
        journalBgLined: "줄무늬",
        journalBgDotted: "점선",
        journalBgGrid: "모눈종이",
        journalFontLabel: "저널 글꼴",
        journalFontDefault: "기본 글꼴",
        journalFontSizeLabel: "글자 크기",
        journalFontSizeDec: "글자 작게",
        journalFontSizeInc: "글자 크게",
        journalColumnsLabel: "단 수 선택",
        journalCols1: "1단",
        journalCols2: "2단",
        journalCols3: "3단"
      }
    },
    en: {
      nav: {
        clock: "🕐 Clock",
        intro: "ℹ️ About",
        guide: "📖 Guide",
        examples: "💡 Examples",
        langToggle: "🌐 한국어",
        export: "⬇️ Export",
        exportImage: "🖼️ Save as Image",
        exportPdf: "📄 Save as PDF",
        exportImageFull: "🖼️ Save as Image (with title & time)",
        exportPdfFull: "📄 Save as PDF (with title & time)",
        exportHtml: "🌐 Export as HTML (live clock)",
        exportWidget: "🖥️ Windows Widget (Coming Soon)"
      },
      footer: {
        privacy: "Privacy Policy",
        contact: "Contact",
        copyright: "© 2026 Round 24-Hour Clock"
      },
      common: {
        tryNow: "Try it now →",
        createNow: "Create yours now →",
        viewGuide: "View guide",
        viewExamples: "View examples",
        backToClock: "Back to clock →"
      },
      intro: {
        pageTitle: "About - Round 24-Hour Clock",
        description: "About the Round 24-Hour Clock: a tool that lays your day out as colored bands on a circular clock face, showing your daily rhythm at a glance.",
        h1: "🕐 Round 24-Hour Clock",
        tagline: "A schedule that spreads your 24-hour day across a circular clock face, so you can see today's rhythm at a glance.",
        heroAlt: "Example clock preview",
        introParagraph: "A typical list-style schedule doesn't give you an intuitive sense of how much of the day is left or where you are right now. This clock represents your whole day as a single circle — school, work, exercise, and rest sit side by side as colored bands, with the hour hand sweeping across them to mark the present moment.",
        featuresHeading: "Key Features",
        feature1Title: "Add tasks fast by dragging",
        feature1Desc: "Drag across an empty spot on the clock face and the start/end times are filled in automatically, rounded to 10 minutes.",
        feature2Title: "10-color palette",
        feature2Desc: "Pick a distinct color for each task so you can read the shape of your day at a glance.",
        feature3Title: "Dark mode support",
        feature3Desc: "Follow your system setting, or choose light/dark manually.",
        feature4Title: "Alarms & browser notifications",
        feature4Desc: "Get notified with sound and a notification when a task starts or ends.",
        feature5Title: "Fully customizable",
        feature5Desc: "Adjust the clock face style (donut, thin band, pie, outline), fonts, and label position, rotation, and size.",
        feature6Title: "Easy deletion",
        feature6Desc: "Delete a task from the list, or by hovering over it right on the clock face.",
        tip: "💡 Everything is stored only in this browser and starts fresh every midnight. Nothing is sent to a server.",
        demoTitles: ["Wake up · Get ready", "Morning work", "Lunch", "Afternoon work", "Exercise", "Rest"]
      },
      guide: {
        pageTitle: "Guide - Round 24-Hour Clock",
        description: "How to use the Round 24-Hour Clock: adding and deleting tasks, adjusting label position, display settings, and alarms — step by step.",
        h1: "📖 Guide",
        tagline: "A step-by-step walkthrough of every feature in the Round 24-Hour Clock.",
        h2_1: "1. Adding a Task",
        h3_1a: "Method A · Type it in",
        step1_1: "Enter the <span class=\"key\">start time</span> and <span class=\"key\">end time</span>.",
        step1_2: "Type a name in the <span class=\"key\">Task</span> field. (e.g. Exercise)",
        step1_3: "Pick a <span class=\"key\">color</span> swatch, or use the round button at the end to choose a custom color.",
        step1_4: "If needed, turn on <span class=\"key\">Set Alarm</span> and choose whether it rings at the start or end time.",
        step1_5: "Press <span class=\"key\">Add</span> and a band appears on the clock.",
        h3_1b: "Method B · Drag on the clock face",
        step2_1: "Press and hold on an <b>empty spot on the clock face</b> and drag in the direction you want.",
        step2_2: "When you release, the <span class=\"key\">start time</span> / <span class=\"key\">end time</span> are filled in automatically, rounded to 10 minutes, and the selected area stays shown as a dashed band.",
        step2_3: "If you don't like it, click the <span class=\"key\">✕</span> mark outside the band to cancel.",
        step2_4: "Dragging again automatically replaces the previous selection.",
        step2_5: "Enter a <span class=\"key\">Task</span> name and press <span class=\"key\">Add</span> to register it as a real task.",
        tip1: "💡 Clicking a spot that already has a task will trigger that task's tooltip or move/rotate handles first, so start dragging from empty space when creating a new task.",
        h2_2: "2. Deleting a Task",
        step3_1: "Press the <span class=\"key\">Delete</span> button on the item in the <b>Today's To-Do List</b> on the left.",
        step3_2: "Or hover over a task label on the clock and click the <span class=\"key\">✕</span> button that appears to delete it instantly.",
        h2_3: "3. Changing Label Position & Shape",
        p3: "Hover over a task name (label) on the clock to reveal its handles.",
        step4_1: "<b>Drag</b> a label directly to move it.",
        step4_2: "Drag the <span class=\"key\">↻</span> handle to rotate the text.",
        step4_3: "Drag the <span class=\"key\">↕</span> handle to make the text bigger or smaller.",
        step4_4: "<b>Double-click</b> a handle to reset its position, angle, or size.",
        h2_4: "4. Display Settings",
        p4: "Expand the <b>Display Settings</b> card to change how the clock looks.",
        card1Title: "Theme",
        card1Desc: "Choose to follow the system setting, or set light/dark manually.",
        card2Title: "Clock Face Style",
        card2Desc: "Four styles are available: donut (default), thin band, pie, and outline.",
        card3Title: "Clock Font",
        card3Desc: "Switch between gothic, handwriting, and brush-style fonts.",
        card4Title: "Clock Title & Top Display",
        card4Desc: "Set a title above the clock and choose whether to show the time, the title, or both.",
        card5Title: "Band Thickness & Font Size",
        card5Desc: "Use sliders to adjust the task band thickness and the task, title, and time font sizes.",
        h2_5: "5. Alarms & Browser Notifications",
        step5_1: "Turn on <span class=\"key\">Set Alarm</span> when adding a task to be notified at its start or end time.",
        step5_2: "The first time you open the page, a banner reading <b>\"Allow notifications to receive alarms\"</b> appears at the top. Press <span class=\"key\">Allow</span> for browser notifications; otherwise you'll get an on-screen toast message and sound instead.",
        h2_6: "6. Where Is My Data Stored?",
        tip2: "💾 All tasks and settings are stored <b>only in this browser</b> (nothing is sent to a server). Tasks reset automatically at midnight and are not synced across other devices or browsers."
      },
      examples: {
        pageTitle: "Examples - Round 24-Hour Clock",
        description: "Three examples — a student, an office worker, and a workout routine — showing how to use the Round 24-Hour Clock for your day.",
        h1: "💡 Try It Like This",
        tagline: "See three examples of whose day looks like what on the clock. Just swap the times and colors and it applies just as well to your own day.",
        persona1Title: "📚 A Student's Day",
        persona1Alt: "Student schedule example",
        persona1Desc: "Splitting the day by color — from commute to self-study to homework — shows at a glance how much time went into studying today. The empty clock face after 10 PM is sleep time.",
        persona2Title: "💼 An Office Worker's Day",
        persona2Alt: "Office worker schedule example",
        persona2Desc: "Separating work, meetings, lunch, and personal time lets you tell at a glance whether a day is packed with meetings or nice and relaxed, just from the shape of the clock.",
        persona3Title: "🏃 A Workout Routine",
        persona3Alt: "Workout routine schedule example",
        persona3Desc: "Pin a recurring routine — like a morning run and evening strength training — to a fixed color, and an alarm can keep you on track at the same time every day.",
        h2: "Applying This to Your Own Day",
        step1: "Pick whichever example above is closest to your lifestyle.",
        step2: "Open the <a href=\"index.html\">clock page</a> and try entering the example's start/end times and names as-is.",
        step3: "Reusing the same color for a category (e.g. work is always blue, exercise is always red) makes it easier to read at a glance later.",
        step4: "See the <a href=\"guide.html\">guide page</a> for details on how to enter tasks.",
        studentTitles: ["Wake up · Get ready", "Commute", "Classes", "After-school study", "Dinner", "Homework", "Free time"],
        workerTitles: ["Get ready · Commute", "Morning work", "Lunch", "Meetings", "Afternoon work", "Dinner", "Exercise", "Personal time"],
        fitnessTitles: ["Morning stretch", "Morning run", "Breakfast", "Work", "Strength training", "Cool-down stretch", "Dinner", "Reading · Rest"]
      },
      auth: {
        menuSignIn: "Sign in",
        menuSynced: "Synced",
        signInGoogle: "🔑 Sign in with Google",
        signOut: "↩️ Sign out",
        statusGuest: "Saved only in this browser for now.",
        statusSynced: "Changes are saved to your account.",
        statusSyncing: "Syncing…",
        privacyNote: "Sign in to save your schedule to your account and see it on other devices. Without signing in, it stays in this browser only.",
        privacyLink: "Privacy policy",
        importPrompt: "☁️ Import {count} day(s) of schedules from this browser into your account?",
        importBtn: "Import",
        importDoneTitle: "Import complete",
        importDoneBody: "This browser's schedules were saved to your account.",
        importErrorBody: "The import failed. Please try again.",
        syncErrorTitle: "Sync failed",
        syncErrorBody: "Your changes are safe in this browser. We'll retry shortly.",
        pullErrorBody: "Couldn't load your saved schedules. Continuing with this browser's data.",
        signInErrorTitle: "Sign-in failed",
        signInErrorBody: "Couldn't start sign-in. Please try again in a moment."
      },
      privacy: {
        pageTitle: "Privacy Policy - Round 24-Hour Clock",
        description: "Privacy policy for the Round 24-Hour Clock site: what data is stored, cookies, and the use of Google AdSense advertising.",
        h1: "🔒 Privacy Policy",
        tagline: "How the Round 24-Hour Clock (\"this site\") handles visitor information.",
        h2_1: "1. Data Stored by This Site",
        h3_1_local: "1-1. Using the site without signing in (default)",
        p1: "If you don't sign in, any tasks, colors, and display settings you enter on this site are stored only in <b>your browser (localStorage)</b>. They are never sent to a server or collected in a database, and they do not follow you if you clear your browser storage or switch to a different device or browser.",
        h3_1_cloud: "1-2. Using the site while signed in (optional)",
        p1_cloud: "If you want the same schedule on more than one device, you may <b>optionally</b> sign in with a Google account. Only then is the data below stored with the cloud database service <a href=\"https://supabase.com/privacy\" target=\"_blank\" rel=\"noopener\">Supabase</a> and linked to your account. Signing in is entirely optional — if you don't, nothing leaves your browser.",
        li1_1: "Your tasks per date (title, times, color, alarm settings) and anything written in the journal",
        li1_2: "Display settings (theme, clock style and size, hand/title/label settings, journal font and column count, language)",
        li1_3: "The email address and basic profile information of the Google account you signed in with, used to identify your account",
        li1_4: "This site never receives or stores a password — sign-in is handled by Google and Supabase.",
        li1_5: "Stored data is readable only by your own account, and after you sign out further changes are again saved only in this browser.",
        li1_6: "To have your account and its stored data deleted, email the contact address below.",
        h2_2: "2. Cookies and Google AdSense",
        p2: "This site displays ads through Google AdSense. Google and other third-party vendors may use cookies (such as the DART cookie) to serve ads based on a visitor's past visits to this or other sites.",
        li2_1: "You can learn how Google uses advertising cookies on the <a href=\"https://policies.google.com/technologies/ads\" target=\"_blank\" rel=\"noopener\">Google Advertising Policies page</a>.",
        li2_2: "If you'd rather not see personalized ads, you can opt out at <a href=\"https://adssettings.google.com/\" target=\"_blank\" rel=\"noopener\">Google Ads Settings</a> or <a href=\"https://www.aboutads.info/choices/\" target=\"_blank\" rel=\"noopener\">aboutads.info</a>.",
        h2_3: "3. Information Collected by Third Parties",
        p3: "Hosting, advertising, and authentication providers (e.g. Cloudflare Pages, Google, Supabase) may independently collect standard access logs (browser type, approximate region, pages visited) when you access this site. This is not information collected or retained by this site's operator, and is governed by each provider's own privacy policy.",
        h2_4: "4. Children's Privacy",
        p4: "This site does not knowingly collect personal information from children under the age of 14.",
        h2_5: "5. Contact",
        p5: "If you have any questions about this privacy policy, please contact <a href=\"mailto:goe9733309@gmail.com\">goe9733309@gmail.com</a>.",
        h2_6: "6. Policy Changes",
        p6: "This privacy policy may be updated as needed, and any changes will be reflected on this page.",
        lastUpdated: "Last updated: July 28, 2026"
      },
      app: {
        pageTitle: "Round 24-Hour Clock",
        description: "A free online schedule that lays your 24-hour day out as colored bands on a circular clock face. Add tasks by dragging, with alarm and dark mode support.",
        todoListHeading: "Today's To-Do List",
        todayBtn: "Today",
        dateInputAria: "Select date",
        pastDateNotice: "Tasks on a past date can't be added or deleted.",
        notifBannerText: "🔔 Allow notifications to receive alarms",
        notifAllow: "Allow",
        notifClose: "Close",
        displaySettings: "Display Settings",
        themeLabel: "Theme",
        themeSystem: "Follow System",
        themeLight: "Light",
        themeDark: "Dark",
        clockStyleLabel: "Clock Face Style",
        styleDonut: "Donut (default)",
        styleThin: "Thin band",
        stylePie: "Pie",
        styleOutline: "Outline",
        fontLabel: "Clock Font",
        fontNotoSans: "Gothic - Noto Sans KR",
        fontNanumGothic: "Gothic - Nanum Gothic",
        fontGowunDodum: "Soft Gothic - Gowun Dodum",
        fontJua: "Round Gothic - Jua",
        fontBlackHan: "Impact Gothic - Black Han Sans",
        fontGowunBatang: "Batang - Gowun Batang",
        fontNanumMyeongjo: "Myeongjo - Nanum Myeongjo",
        fontGaegu: "Handwriting - Gaegu",
        fontNanumPen: "Handwriting - Nanum Pen Script",
        fontSingleDay: "Handwriting - Single Day",
        fontNanumBrush: "Brush - Nanum Brush Script",
        fontHiMelody: "Handwriting - Hi Melody",
        titleInputLabel: "Clock Title",
        titleInputPlaceholder: "e.g. New Schedule",
        handShapeLabel: "Hand Shape",
        handShapeBar: "Bar (default)",
        handShapeArrow: "Arrow",
        handShapeDiamond: "Diamond",
        handShapeTaper: "Teardrop",
        handThicknessLabel: "Hand Thickness",
        showTopLabel: "Show at Top",
        showTime: "Time",
        showTitle: "Title",
        showBoth: "Both",
        clockSizeLabel: "Clock Size",
        bandThickness: "Band Thickness",
        labelFontSize: "Task Label",
        titleFontSize: "Title Size",
        timeFontSize: "Time Size",
        hintText: "Drag a label to move it, use the handles (↻ rotate · ↕ resize), double-click to reset.",
        scheduleHeading: "Add Schedule",
        importDateLabel: "Import from another date",
        importBtn: "Import",
        importNeedDate: "Please select a date to import from.",
        importSameDate: "That's the same date you're currently viewing.",
        importEmpty: "There are no saved tasks on the selected date.",
        startTimeLabel: "Start Time",
        endTimeLabel: "End Time",
        taskLabel: "Task",
        taskPlaceholder: "e.g. Exercise",
        colorLabel: "Color",
        alarmLabel: "Set Alarm",
        alarmAtStart: "Ring at start time",
        alarmAtEnd: "Ring at end time",
        addBtn: "Add",
        defaultTitle: "New Schedule",
        customColorTitle: "Custom color",
        emptyList: "No tasks yet.",
        completeAria: "Mark complete",
        deleteBtn: "Delete",
        alarmFlagStart: "Start",
        alarmFlagEnd: "End",
        errorNeedTimes: "Please enter both a start and end time.",
        errorNeedTitle: "Please enter a task name.",
        errorEndBeforeStart: "End time must be after start time.",
        alarmBody: "{start} - {end} ({trigger} time alert)",
        exampleWakeUp: "Wake up",
        exampleMorningExercise: "Morning exercise",
        comingSoonTitle: "Windows Widget",
        comingSoonBody: "Coming soon!",
        exportingToast: "Exporting...",
        exportErrorTitle: "Export Error",
        exportErrorToast: "Export failed.",
        journalHeading: "Journal",
        journalPlaceholder: "Write about your day...",
        journalBgPickerAria: "Choose background",
        journalBgBlank: "Blank",
        journalBgLined: "Lined",
        journalBgDotted: "Dotted",
        journalBgGrid: "Grid paper",
        journalFontLabel: "Journal font",
        journalFontDefault: "Default font",
        journalFontSizeLabel: "Font size",
        journalFontSizeDec: "Decrease font size",
        journalFontSizeInc: "Increase font size",
        journalColumnsLabel: "Choose column count",
        journalCols1: "1 col",
        journalCols2: "2 col",
        journalCols3: "3 col"
      }
    }
  };

  function getLang() {
    var saved = null;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch (e) {
      saved = null;
    }
    return saved === "en" ? "en" : "ko";
  }

  function lookup(lang, key) {
    var parts = key.split(".");
    var node = dict[lang];
    for (var i = 0; i < parts.length; i++) {
      if (node == null) {
        return undefined;
      }
      node = node[parts[i]];
    }
    return node;
  }

  function t(key, vars) {
    var lang = getLang();
    var value = lookup(lang, key);
    if (value === undefined) {
      value = lookup("ko", key);
    }
    if (typeof value !== "string") {
      return value;
    }
    if (vars) {
      Object.keys(vars).forEach(function (varKey) {
        value = value.split("{" + varKey + "}").join(vars[varKey]);
      });
    }
    return value;
  }

  function applyTranslations() {
    var lang = getLang();
    document.documentElement.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));
    }

    nodes = document.querySelectorAll("[data-i18n-html]");
    for (i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = t(nodes[i].getAttribute("data-i18n-html"));
    }

    nodes = document.querySelectorAll("[data-i18n-placeholder]");
    for (i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute("placeholder", t(nodes[i].getAttribute("data-i18n-placeholder")));
    }

    nodes = document.querySelectorAll("[data-i18n-aria-label]");
    for (i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute("aria-label", t(nodes[i].getAttribute("data-i18n-aria-label")));
    }

    nodes = document.querySelectorAll("[data-i18n-title]");
    for (i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute("title", t(nodes[i].getAttribute("data-i18n-title")));
    }

    nodes = document.querySelectorAll("[data-i18n-content]");
    for (i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute("content", t(nodes[i].getAttribute("data-i18n-content")));
    }

    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.textContent = t("nav.langToggle");
    }

    try {
      global.dispatchEvent(new CustomEvent("roundclock:langchange", { detail: { lang: lang } }));
    } catch (e) {
      // CustomEvent unavailable — ignore, static translations already applied
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang === "en" ? "en" : "ko");
    } catch (e) {
      // localStorage unavailable — language choice won't persist this session
    }
    applyTranslations();
  }

  function initLangToggle() {
    var toggle = document.getElementById("lang-toggle");
    if (!toggle) {
      return;
    }
    toggle.addEventListener("click", function () {
      setLang(getLang() === "ko" ? "en" : "ko");
    });
  }

  global.RoundClockI18n = { t: t, getLang: getLang, setLang: setLang };

  document.addEventListener("DOMContentLoaded", function () {
    applyTranslations();
    initLangToggle();
  });
})(window);
