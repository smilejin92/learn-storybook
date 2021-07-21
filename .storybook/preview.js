// story 컴포넌트에도 global 스타일 적용
import '../src/index.css';

export const parameters = {
  // actions 파라미터는 스토리 컴포넌트에 콜백 함수(mocked callback)를 전달하여
  // 테스트 할 수 있도록 해준다.
  // 스토리 컴포넌트에 전달된 콜백 함수는 스토리북 UI actions 패널에서 확인 할 수 있다.
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
