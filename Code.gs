// ================================
// 교육자료 신청 웹앱 - Code.gs
// ================================

const SPREADSHEET_ID = '1cjrffBqji9h7j11Gc0srbjlBwnP2ofsNrRanLd0AH2g';


// 웹앱 화면 열기
function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('교육자료 신청');
}


// 설문 결과를 구글 스프레드시트에 저장
function saveSurvey(data) {

  // 데이터가 제대로 넘어왔는지 확인
  if (!data) {
    throw new Error('설문 데이터가 없습니다.');
  }

  // 각 답변 가져오기
  const difficulty = data.difficulty || '';
  const helpful = data.helpful || '';
  const speed = data.speed || '';
  const material = data.material || '';
  const message = data.message || '';

  // 필수 질문 확인
  if (!difficulty) {
    throw new Error('1번 질문에 답해주세요.');
  }

  if (!helpful) {
    throw new Error('2번 질문에 답해주세요.');
  }

  if (!speed) {
    throw new Error('3번 질문에 답해주세요.');
  }

  if (!material) {
    throw new Error('4번 질문에 답해주세요.');
  }

  // 스프레드시트 열기
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  // 첫 번째 시트 가져오기
  const sheet = spreadsheet.getSheets()[0];

  // 새로운 행 추가
  sheet.appendRow([
    difficulty,
    helpful,
    speed,
    material,
    message
  ]);

  // 저장 완료 메시지
  return '오늘 교육 받느라 수고하셨습니다.';
}