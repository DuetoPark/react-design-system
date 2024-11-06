# **Design-system 프로젝트**

<img width="1680" alt="스크린샷 2024-11-07 오전 1 18 50" src="https://github.com/user-attachments/assets/32146090-a9ba-4ebb-aa41-3c41b333a3ad">

## 코드실행

```
> yarn install

> yarn storybook
```

## 요약

- 링크: [storybook 배포 페이지](https://672b99b618065f759d3ae16e-lyfkzljnvx.chromatic.com/?path=/docs/atoms-avatar--docs)
- 시작: 2024.08.15 ~ 2024.09.13
- 규모: 개인 프로젝트
- 목적
  - 디자인 시스템을 제대로 구현해보며 UI에 대한 나의 열정을 보여주자
  - Typescript 익히기
- 프로젝트 기술스택
  - `React`: 컴포넌트 단위로 코드를 작성하고, 재사용 가능한 컴포넌트를 제작하기 위함
  - `Typescript`: 개발 단계에서 오류를 발견하고, 타입 오류를 줄이기 위함
  - `SCSS`: 통일된 스타일을 빠르게 구현하기 위함
  - `Storybook`: 컴포넌트를 시각적으로 확인하며 개발하기 위함
- `Radix Primitive UI`를 사용한 이유
  - **스타일을 내 입맛대로** 설정하는 동시에, **라이브러리가 제공하는 웹 접근성** 기능을 그대로 활용하기 위함
  - 모든걸 내가 작업해야 하지만, 빠르게 구현이 가능
  - Headless UI는 종류가 적어서 사용하지 않음
    - 프로젝트를 진행하고나서 공식 홈페이지를 다시 들어가보니 제공하는 컴포넌트 가짓수가 상당히 늘었다. Tailwind와의 호환성이 좋으므로, 빠르게 구현해야하는 프로젝트에서 사용해보자
- 디자인 패턴
  - `Presentational and Container 패턴` : 로직과 View 분리

### 개발 환경

- 보일러 플레이트
  - `Create-React-App`
  - 이유: 빠른 작업 진행을 위해 사용
- 사용 언어와 컴파일러
  - `Javascript & Typescript`
  - 이유: ts의 자동 타입 유추 기능과 vscode의 인텔리전스를 사용하여 안정적으로 코드를 구현하기 위함
- 패키지 매니저
  - `yarn berry`
  - 이유: pnp로 프로젝트를 경량화 함
- 테스트와 문서화
  - `Storybook`
  - 이유: 컴포넌트를 만들때 바로바로 테스트하며 제작하기 위함

### 디자인 가이드 레퍼런스

- [Wanted Design Library](<https://www.figma.com/design/Jz7iNlO1TT6WZlwIXTZixr/Wanted-Design-Library-(Community)?node-id=1173-12995&t=IxwhaPXh8Q5QJeYn-0>)
- 도움받은 글
  - [제품이 커지면 디자인 시스템 가이드는 어떻게 개선돼야 할까?](https://toss.tech/article/toss-design-system-guide)
  - [사용 가능한 진짜 디자인 시스템을 만드는 여정](https://blog.hwahae.co.kr/all/tech/13236)

---

## 1. 폴더 구조

Presentational UI의 개별 스타일시트는 tsx 파일과 동일한 폴더에 둘 것이다.
대신, shared되는 style은 별도의 폴더를 만들고 그곳에서 관리하려 한다.

- src/styles: shared 스타일 파일을 저장할 폴더. mixin, variables 등이 포함됨.
- src/components: 실제 Presentational UI를 구현할 폴더.

### src/styles 폴더

#### 폴더 구조

```
src
ㄴstyles
	ㄴbase
		ㄴ_fonts.scss
		ㄴ_globals.scss
		ㄴ_normalize.scss
		ㄴ_reset.scss
	ㄴvariables
		ㄴ_colors.scss
		ㄴ_typography.scss
		ㄴ_breakpoints.scss
		ㄴ_z-indexes.scss
	ㄴmixins
		ㄴ_font.scss
		ㄴ_gradient.scss
		ㄴ_interaction.scss
		ㄴ_position.scss
		ㄴ_responsive.scss
		ㄴ_shadow.scss
	ㄴthemes
		ㄴ_light.scss
		ㄴ_dark.scss
		ㄴ_themes.scss
	ㄴindex.scss
```

작업에 들어가기 전, SCSS의 사용 규칙을 정리하였다.

- 용도 별로 파일 분리하기
  - base
  - variables
  - theme
  - mixin
  - ...
- index 파일에 모든 파일 import
  - variables > theme > base > mixin 순서로 import
  - 범용일수록 상단에 import
  - 목적이 뚜렷할수록 하단에 import

#### 폴더별 용도

- base
  - 용도: **스타일 초기화**, 글로벌 스타일 선언
  - 파일: reset, normalize, global
- variables
  - 용도: **범용으로 사용되는 스타일 변수**, 디자인 가이드에 선언된 규칙
  - 파일: colors, typography, breakpoints, z-indexes, ...
- theme
  - 용도: **light/dark 테마 변수**
  - 파일: color-light, color-dark, color(light/dark 통합본), ...
- mixin
  - 용도: **자주 사용되는 스타일 블록**
  - 파일: font, gradient, interaction, position, responsive, ...

#### 파일명 규칙

- 파일명에는 `언더바(_)`를 붙인다.
  - 컴파일 최적화를 위함
  - 언더스코어를 붙이지 않는다면, 분할된 파일들 모두가 컴파일되어 여러개의 .css파일이 나눠서 저장됨
  - scss파일의 이름 앞에 언더스코어를 붙이면, Sass는 index.scss 파일의 일부분이라 이해하고 해당 파일을 css파일로 컴파일하지 않음. index.scss 내부에서 @import 형태로 작동

### src/components 폴더

#### 폴더 구조

```
// NOTE: 예시 구조
src
ㄴcomponents
	ㄴatoms
		ㄴButton
			ㄴ_button.scss
			ㄴButton.tsx
			ㄴButton.stories.tsx
		ㄴIcon
			ㄴ_icon.scss
			ㄴIcon.tsx
			ㄴIcon.stories.tsx
		ㄴIconButton
			ㄴ_iconButton.scss
			ㄴIconButton.tsx
			ㄴIconButton.stories.tsx
		ㄴSwtich
			ㄴ_swtich.scss
			ㄴSwtich.tsx
			ㄴSwtich.stories.tsx
```

이번 프로젝트는 관심사 분리라는 주제가 관통하기 때문에, **폴더 구조도 하나의 스코프**라고 생각하며 구조를 짰다.

다른 프로젝트에 FSD를 적용했었는데, 7계층에 맞게 딱 떨어지는 컴포넌트는 드물었다. 그리고 일주일 후에 다시 들어가서 수정하려니까 파일 찾기 너무 어려웠다. FSD를 제대로 이해하지 못한 것과 내 프로젝트의 성격을 제대로 파악하지 않았기 때문이었다. 프로젝트가 끝나고 회고에 특정 컨벤션을 도입하는 것보다 규칙적인 구조를 짜보는 연습을 해두자고 적어두었다.

이전 회고를 반영하여, 규칙적인 구조를 짜보았다. 프렉탈 구조와 유사하다.
컴포넌트 폴더에는 스타일시트, 컴포넌트 파일, 스토리북이 들어있다. 하위 컴포넌트가 필요하면, 컴포넌트 폴더와 동일한 구조의 폴더를 만들면 된다.

#### 컴포넌트 폴더 구조

- 컴포넌트 종류
  - 컴포넌트 파일
  - 스타일 파일
  - storybook 파일
  - 하위 컴포넌트 폴더
    - 컴포넌트 파일
    - 스타일 파일
    - storybook 파일
  - ...

#### 파일명 규칙

- 컴포넌트 파일
  - 대문자로 시작
  - `컴포넌트명.tsx`
- 스타일 파일
  - 언더바 + 소문자로 시작
  - `_컴포넌트명.scss`
- storybook 파일
  - 컴포넌트 파일과 동일
  - `컴포넌트명.stories.tsx`

#### 컴포넌트 분류

- 분류
  - src/components/atoms
    - Button
    - Avatar
    - FloatingButton
    - Checkbox
    - Radio
    - ...
  - src/components/layout
    - Container
    - Dialog

ant design 라이브러리의 공식 홈페이지와 atomic design 패턴에서 힌트를 얻었다.
하지만 ant design Github를 보니까 components 폴더에 모든 컴포넌트가 들어가있었다.
이미 돌아올 수 없는 강을 건넜다. 일단 이렇게 두고 나중에 필요하면 고치자.

---

## 2. Presentational UI 스타일 구현 방식

### 결론

`Radix Primitive UI + classnames 라이브러리 + scss`

스타일을 구현할 선택지는 3가지 였다.

- scss
- tailwind
- styled components

이 중에 scss를 선택한 이유는 다음과 같다.

- style 코드는 CSS파일에 모아서 관리
- 클래스명을 간결하게 만들어, 가독성이 높임
- 중복되는 스타일 코드를 줄이고, 통일된 스타일 구현

### tailwind와 scss로 구현한 컴포넌트 예시 코드 비교

구현에 들어가기 전, tailwind로 Presentational UI를 구현하면 어떤 방식으로 진행하게 될 지 궁금해서 ChatGPT에게 예시 코드를 요청했다.

Button 컴포넌트에 아래의 조건을 넣어서 예시 코드를 받아왔다.

- variant: primary, secondary
- size: small, medium, large

#### tailwind 예시

```jsx
// src/components/Button.js
import * as React from "react";
import { Button as RadixButton } from "@radix-ui/react-button";
import clsx from "clsx";

const Button = React.forwardRef(
  ({ variant = "primary", size = "medium", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
      primary: "bg-primary text-white hover:bg-primary-dark",
      secondary: "bg-secondary text-white hover:bg-secondary-dark",
    };

    const sizeStyles = {
      small: "px-3 py-1 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    };

    return (
      <RadixButton
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size])}
        {...props}
      >
        {children}
      </RadixButton>
    );
  }
);

export default Button;
```

```jsx
// src/App.js Button 컴포넌트 사용예시
import React from "react";
import Button from "./components/Button";

function App() {
  return (
    <div className="p-8">
      <Button variant="primary" size="medium">
        Primary Button
      </Button>
      <Button variant="secondary" size="large">
        Secondary Button
      </Button>
    </div>
  );
}

export default App;
```

- 장점
  - 별도의 스타일 파일이 필요없다.
  - 가독성이 좋다.
    - 어떤 스타일타입이 있는지 객체로 구분되어 있고
    - props가 객체의 key로 쓰인다.
    - `className={clsx(baseStyles, variantStyles[variant], sizeStyles[size])}`
- 우려되는 점
  - tailwind는 섬세하게 스타일을 지정하면 코드가 길어진다. 이러면 유지보수가 힘들다.
  - 이유: tailwind를 사용했던 프로젝트에서 focus/active/disabled 스타일 추가했는데, 나중에 수정할 때 정말정말 헷갈렸다.

#### scss 예시

```scss
/* src/styles/Button.scss */
$primary-color: #4f46e5;
$primary-color-dark: #3730a3;
$secondary-color: #ec4899;
$secondary-color-dark: #db2777;
$white: #ffffff;

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  // variant
  &--primary {
    background-color: $primary-color;
    color: $white;

    &:hover {
      background-color: $primary-color-dark;
    }
  }

  &--secondary {
    background-color: $secondary-color;
    color: $white;

    &:hover {
      background-color: $secondary-color-dark;
    }
  }

  // size
  &--small {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }

  // ...
}
```

```jsx
// src/components/Button.js
import * as React from "react";
import { Button as RadixButton } from "@radix-ui/react-button";
import classNames from "classnames";
import "../styles/Button.scss";

const Button = React.forwardRef(
  (
    {
      variant = "primary",
      size = "medium",
      styleType = "solid",
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <RadixButton
        ref={ref}
        className={classNames(
          `button button--${styleType}-${variant}`,
          `button--${size}`,
          isLoading && "button--loading"
        )}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </RadixButton>
    );
  }
);

export default Button;
```

- 장점
  - 스타일은 SCSS 파일에서 별도로 관리한다.
- 우려되는 점
  - 다크모드를 어떻게 구현하면 좋을까.

생각보다 장점이 많지 않아 당혹스럽다.
하지만 나를 믿고 한번 진행해보자.

---

## 3. Storybook

- 설치; `npx sb init`
- 동작: `yarn storybook`
- 주의: stories 폴더에 {컴포넌트명}.stories.tsx 파일 있어야 함.

### 연동하면서 겪은 문제

#### 다크모드 적용되지 않음

##### 문제 상황

다크모드 확인을 위해 storybook에 `storybook-dark-mode` addon을 설치 후에 preview.ts 파일에 다크모드 설정 코드를 추가했다.

storybook에 darkmode 전환 컨트롤러가 생성되었지만, 컨트롤러를 클릭했지만 다크모드가 제대로 적용되지 않은 문제가 발생하였다.

##### 해결 방법

- 결론
  - storybook은 다크모드를 지원할 때, 클래스명이 토글되는 방식으로 구현된다.
  - data-attr 값을 토글하던 방식을 className을 토글하는 방식으로 변경.
    - 기존: `html[data-theme=${light/dark}]`
    - 변경: `html.${light/dark}`

##### 시도한 방법

1. scss가 인식되지 않는다고 판단 (실패!)
   - 모든 storybook package를 삭제하고 다시 깔기
   - stackoverflow에서 추천한 addon을 설치하기
     - body background 색상을 red로 설정한 scss 코드가 정상 동작됨을 확인했으나
     - darkmode 전환이 되지 않음
2. 캐시가 꼬였다고 판단 (실패!)
   - 캐시 삭제 후 재설치
     - 별다른 차이가 없었다.
     - 개발자 도구를 돌아보던 중, scss는 정상적으로 load 되는데 **css 사용자 속성이 인식되지 않음을 확인**
3. css 사용자 속성 대신 클래스명 토글하는 방식 사용 (성공!)
   - 처음 설정: html 태그의 `data-theme` 속성 값으로 라이트/다크 구분
   - 바뀐 설정: html 태그의 `className` 속성 값으로 라이트/다크 구분

공식 홈페이지를 보니, **storybook의 다크모드는 오로지 className로만 적용할 수 있음** 이라고 표기되어 있었다. 공식 홈페이지를 잘 보자..

##### 변경 전 theme 코드

```scss
/* src/styles/theme/_color.scss */
html[data-theme="light"] {
  --static-white: #{$static-white-light};
  --static-black: #{$static-black-light};
  // ...
}

html[data-theme="dark"] {
  --static-white: #{$static-white-dark};
  --static-black: #{$static-black-dark};
  // ...
}
```

##### 변경 후 theme 코드

```scss
/* src/styles/theme/_color.scss */
.light {
  --static-white: #{$static-white-light};
  --static-black: #{$static-black-light};
  // ...
}

.dark {
  --static-white: #{$static-white-dark};
  --static-black: #{$static-black-dark};
  // ...
}

$static-white: var(--static-white);
$static-black: var(--static-black);
```

##### 레퍼런스

- https://storybook.js.org/addons/storybook-dark-mode
- [Storybook으로 UI 테스팅과 배포(CI) 한번에 해결하기](https://llbllhllk.tistory.com/133)

---

# **스타일**

## 1. 색상테마 (라이트/다크) 구현

![[스크린샷 2024-09-11 오후 4.34.23.png]]
![[스크린샷 2024-09-11 오후 4.34.39 1.png]]

### 구현

- Variable
  - color palette 변수
- Theme
  - light-color 변수
  - dark-color 변수
  - color 변수

모두 index.scss 파일에 import하여 사용한다.

### Variable

```scss
/* src/styles/variables/_color.scss */
$blue-99: #f7fbff;
$blue-95: #eaf2fe;
$blue-90: #c9defe;
$blue-80: #9ec5ff;
$blue-70: #69a5ff;
$blue-60: #3385ff;
$blue-55: #1a75ff;
$blue-50: #0066ff;
$blue-45: #005eeb;
$blue-40: #0054d1;
$blue-30: #003e9c;
$blue-20: #002966;
$blue-10: #001536;
```

- 폴더 위치: src/styles/variables
- 파일 이름: `_color.scss`

디자인 가이드에 나와있는 모든 색상 팔레트를 SCSS 변수에 저장한다.
gray scale 부터 blue, red, green 등 다양하다.

변수명은 `$색상-명도`로 표현한다.
`$blue-99`는 흰색에 가깝고 `$blue-10`는 검정색에 가깝다.

### Theme

- 폴더 위치: src/styles/theme
- 파일 이름: `_color-light.scss`, `_color-dark.scss`, `_color.scss`

theme 폴더의 파일들은 color variable을 가지고 light/dark 모드를 구현한다.
대신, 파일의 성격이 2가지로 분류된다.

- color-semantic 파일
  - 색상을 키워드로 표현
- theme 파일
  - color-semantic 파일의 변수를 사용하여 light/dark 테마 구현

#### Color-semantic

```scss
/* src/styles/theme/_color-light.scss */
$primary-normal-light: $blue-50;
$primary-strong-light: $blue-45;
$primary-heavy-light: $blue-40;

$label-normal-light: $coolNeutral-10;
$label-strong-light: $common-0;
$label-neutral-light: rgba($coolNeutral-22, $opacity-88);
$label-alternative-light: rgba($coolNeutral-25, $opacity-61);
$label-assistive-light: rgba($coolNeutral-25, $opacity-28);
$label-disable-light: rgba($coolNeutral-25, $opacity-16);
```

- 색상을 키워드로 표현
- ex. static, background, label, ...
- light color 파일, dark color 파일 구분됨
- 변수명 suffix
  - `키워드-light`
  - `키워드-dark`

#### theme

```scss
/* src/styles/theme/_color.scss */
.light {
  --static-white: #{$static-white-light};
  --static-black: #{$static-black-light};
  // ...
}

.dark {
  --static-white: #{$static-white-dark};
  --static-black: #{$static-black-dark};
  // ...
}

$static-white: var(--static-white);
$static-black: var(--static-black);
```

- color-semantic 파일의 변수를 사용하여 light/dark 테마 구현
- class명으로 라이트/다크 모드를 구분
  - 라이트 모드: `.light`
  - 다크 모드: `.dark`
  - 적용 대상: html 태그

### Theme에서 CSS 변수를 그대로 사용하지 않는 이유

**SCSS의 자동완성 기능**을 사용하기 위함이다.

css 변수는 VSCode에서 자동완성이 안된다.
하지만 SCSS 변수는 VSCode의 인텥리전스를 통해 변수명을 불러올 수 있다. 자동완성 기능을 사용해서 빠르고 안전하게 작업할 환경을 만들고자 했다.

**`_button.scss`**
![[스크린샷 2024-09-11 오후 2.35.56.png]]

### 구현하며 겪은 문제

#### SCSS 컴파일러와 rgba

##### 문제 상황

Button 컴포넌트의 배경색을 rgba로 설정하기위해 theme 변수를 사용했으나, 배경색이 적용되지 않는 에러가 발생했다. 개발자 도구를 확인해보니 theme 변수가 색상값으로 치환되지 않았다.

**SCSS 컴파일러는 CSS 변수를 동적으로 평가할 수 없어서** 발생한 에러였다.

```scss
/* src/styles/theme/_color.scss */
.light {
	--interaction-light-blue: $primary-normal-light;
	...
}

.dark {
	--interaction-light-blue: $primary-normal-dark;
	...
}

$interaction-light-blue: var(--interaction-light-blue);
```

```scss
/* src/styles/mixin/_interaction.scss */
@use "../theme/color" as *;

@mixin interaction-light-blue {
  &:hover:not(:disabled) {
    background-color: rgba($interaction-light-hover-blue, 0.375); // 컴파일 에러
  }

  &:focus:not(:disabled) {
    background-color: rgba($interaction-light-focus-blue, 0.5); // 컴파일 에러
  }

  &:active:not(:disabled) {
    background-color: rgba($interaction-light-active-blue, 0.7); // 컴파일 에러
  }
}
```

`interaction.scss` 파일에서 `$interaction-light-hover-blue`에는 var 변수가 담겨져 있어서 SCSS 컴파일 에러가 난다.

##### 해결 방법

변수 값에 rgba가 적용된 값을 넣기

대신, rgba를 사용하려면 scss의 내장 함수를 이용해 red, green, blue이 추출된 값을 사용해야 한다. 서로 다른 파일에 존재하는 값을 참조할 때, SCSS 컴파일 에러가 발생하기 때문이다.

같은 파일 속의 변수를 참조할 땐, red, green, blue값을 추출하지 않고 변수 그대로 사용하면 된다.

```scss
/* src/styles/theme/_color.scss */
@function rgba-theme($color, $alpha) {
	@return rgba(red($color), green($color), blue($color), $alpha);
}

.light {
	--interaction-light-hover-blue: #{rgba-theme($primary-normal-light, 0.0375)};
	--interaction-light-focus-blue: #{rgba-theme($primary-normal-light, 0.06)};
	--interaction-light-active-blue: #{rgba-theme($primary-normal-light, 0.09)};
	...
}

$interaction-light-hover-blue: var(--interaction-light-hover-blue);
$interaction-light-focus-blue: var(--interaction-light-focus-blue);
$interaction-light-active-blue: var(--interaction-light-active-blue);
```

---

## 2. 폰트 mixin 구현

![[스크린샷 2024-09-11 오후 4.36.01.png]]

### 구현

- Variable
  - typography 변수
- Mixin
  - font mixin

폰트 관련된 css property를 한 묶음으로 사용하기 위해 mixin으로 구현했다.

### Variable

```scss
/* src/styles/variables/_typography_.scss */
$font-weight-bold: 700;
$font-weight-medium: 500;
$font-weight-regular: 400;

$font-display-1-size: 56px;
$font-display-1-lineHeight: 1.286;
$font-display-1-letterSpacing: -0.0319em;

$font-display-2-size: 40px;
$font-display-2-lineHeight: 1.3;
$font-display-2-letterSpacing: -0.0282em;

...
```

- 폴더 위치: src/styles/variables
- 파일 이름: `_typography.scss`

폰트는 용도에 따라 분류하고 변수명에 키워드로 표현했다.
display, title, heading, body, label, ...

변수명은 다음과 같다.

- `$font-키워드-modifier-size`
- `$font-키워드-modifier-lineHeight`
- `$font-키워드-modifier-letterSpacing`

font-weight도 선언했다.
종류는 bold, medium, regular 3가지다.

- `$font-weight-bold`
- `$font-weight-medium`
- `$font-weight-regular`

### Mixin

```scss
/* src/styles/mixin/_font.scss */
@mixin display-1() {
  font-size: $font-display-1-size;
  line-height: $font-display-1-lineHeight;
  letter-spaceing: $font-display-1-letterSpacing;
}

@mixin display-2() {
  font-size: $font-display-2-size;
  line-height: $font-display-2-lineHeight;
  letter-spaceing: $font-display-2-letterSpacing;
}

$weight-map: (
  bold: $font-weight-bold,
  medium: $font-weight-medium,
  regular: $font-weight-regular,
);

@function _get-weight-value($key) {
  @return map-get($weight-map, $key);
}

@mixin font($style: "body-1", $weight: "regular", $color: $label-normal) {
  @if ($style == "display-1") {
    @include display-1();
  }

  @if ($style == "display-2") {
    @include display-2();
  }

  font-weight: _get-weight-value($weight);
  color: $color;
}
```

- 폴더 위치: src/styles/mixin
- 파일 이름: `_font_.scss`

폰트 별로 스타일 코드 블럭을 가진 mixin을 생성했다.
display-1, display-2, heading-1, ...

휴먼 에러를 방지하기 위해 코드블럭을 가진 mixin 호출하는 mixin을 하나 더 생성했다.
매개변수로 스타일, 굵기, 색상값을 받는다.

`font(style, weight, color)`

기본 값은 다음과 같다.

- style defualt: "body-1"
- weight default: "regular"
- color default: $label-normal

---

## 3. shadow mixin 구현

![[스크린샷 2024-09-11 오후 4.37.32.png]]

### 구현

- Theme
  - light-color 변수
  - dark-color 변수
  - color 변수
- Mixin
  - shadow mixin

디자인 가이드를 뜯어보니, shadow도 테마에 따라 색상이 변경되었다.
그래서 Theme 파일에 shadow 관련된 변수를 추가했다.

그리고 강조의 세기에 따라 종류가 달라지므로, mixin을 만들어 코드블록을 불러와 쓰기로 결정했다.
매개변수로 그림자의 세기를 전달하도록 구성해보았다.

### Theme

#### Color-semantic

```scss
/* src/styles/theme/_light.scss *
$shadow-normal-light: 0px 1px 2px rgba(0, 0, 0, 0.12),
0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08);

$shadow-emphasize-light: 0px 2px 8px rgba(0, 0, 0, 0.12),
0px 1px 4px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08);

$shadow-strong-light: 0px 6px 12px rgba(0, 0, 0, 0.12),
0px 4px 8px rgba(0, 0, 0, 0.08), 0px 0px 4px rgba(0, 0, 0, 0.08);

$shadow-heavy-light: 0px 16px 20px rgba(0, 0, 0, 0.12),
0px 8px 16px rgba(0, 0, 0, 0.08), 0px 0px 8px rgba(0, 0, 0, 0.08);
```

- 파일 위치: src/styles/theme
- 파일 이름: `_color-light.scss`, `_color-dark.scss`
- 변수명
  - `$shadow-종류-light`
  - `$shadow-종류-dark`
- 종류
  - normal
  - emphasize
  - strong
  - heavy

#### theme

```scss
/* src/styles/theme/_color.scss */
html[data-theme="light"] {
  // ...
  --shadow-normal: #{$shadow-normal-light};
  --shadow-emphasize: #{$shadow-emphasize-light};
  --shadow-strong: #{$shadow-strong-light};
  --shadow-heavy: #{$shadow-heavy-light};
}

html[data-theme="dark"] {
  // ...
  --shadow-normal: #{$shadow-normal-dark};
  --shadow-emphasize: #{$shadow-emphasize-dark};
  --shadow-strong: #{$shadow-strong-dark};
  --shadow-heavy: #{$shadow-heavy-dark};
}

$shadow-normal: var(--shadow-normal);
$shadow-emphasize: var(--shadow-emphasize);
$shadow-strong: var(--shadow-strong);
$shadow-heavy: var(--shadow-heavy);
```

- 파일 위치: src/styles/theme
- 파일 이름: `_theme.scss`
- 변수명
  - `$shadow-종류`

### Mixin

```scss
/* src/styles/mixin/_shadow_.scss */
$shadow-map: (
  normal: $shadow-normal,
  emphasize: $shadow-emphasize,
  strong: $shadow-strong,
  heavy: $shadow-heavy,
);

@mixin shadow($type) {
  box-shadow: map-get($shadow-map, $type);
}
```

- 파일 위치: src/styles/mixin
- 파일 이름: `_shadow.scss`

SCSS map을 사용했다.
아무래도 풀네임으로 적으면 실수가 발생하기 쉬우므로, 종류만 간략하게 넘기기 위함이다.

---

# **컴포넌트**

## 1. Button 컴포넌트

![[스크린샷 2024-09-11 오후 10.41.53.png]]

맨처음 제작한 컴포넌트이다.
타입 선언이 많이 서툴다. 리팩토링을 진행하려고 했지만, 제작 순서대로 포트폴리오를 기록하여 조금씩 성장하는 모습을 담아보려고 한다.

### 버튼 종류

- solid: 중요도 높음
- outlined: 대체적인 행동에 사용
- text: 부가적이나, 강조가 필요한 행동

| type        | solid                    | outlined            |                     |              | text         |              |
| ----------- | ------------------------ | ------------------- | ------------------- | ------------ | ------------ | ------------ |
| color       | primary                  | primary             | secondary           | assistive    | primary      | assistive    |
| size        | large, medium,small      | large, medium,small | large, medium,small | medium,small | medium,small | medium,small |
| disabled    | true/false               | 좌동                | 좌동                | 좌동         | 좌동<br>     | 좌동<br>     |
| interaction | hovered,focused, pressed | 좌동                | 좌동                | 좌동         | 좌동<br>     | 좌동<br>     |

### 폴더 구조

```
Button
ㄴ _button.scss
ㄴ Button.stories.tsx
ㄴ Button.tsx
ㄴ index.tsx
```

- 폴더 위치: src/components/atoms/Button
- 스타일시트, 스토리북, 컴포넌트, index로 구성

### 사용한 라이브러리

- @radix-ui/themes의 Button
- 이름을 PrimitiveButton으로 바꿔서 사용

### className 규칙

- `button`
- `button--{type}-{color}`
  - type: solid/outlined/text
  - color: primary/secondary/assistive
- `button--{size}`
  - size: small/medium/large

### Props

- Style Props
  - variant: {"solid" | "outlined" | "text"} 버튼 종류
  - color: {"primary" | "secondary" | "assistive"} 버튼 색상 테마
  - size: {"large" | "medium" | "small"} 버튼 크기
- Attribute Props
  - disabled: {boolean} 버튼 비활성화
  - onClick: 버튼 이벤트
  - children: {string | ReactNode} 버튼 내부 요소,
  - ...props: 버튼 기본 attr

### 타입

#### 1. 첫번째 시도

`OR(|) 연산자를 이용한 유니온 타입` 사용하기

```tsx
interface ButtonAttrProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 버튼 클릭 리스너 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 안의 내용 */
  children: string | ReactNode;
}

interface SolidButtonStyle extends ButtonAttrProps {
  /** 버튼 종류 */
  variant?: "solid";
  /** 버튼 테마 */
  color?: "primary";
  /** 버튼 크기 */
  size?: "large" | "medium" | "small";
}

interface OutlinedButtonStyle extends ButtonAttrProps {
  variant?: "outlined";
  color?: "primary" | "secondary" | "assistive";
  size?: "large" | "medium" | "small";
}

interface TextButtonStyle extends ButtonAttrProps {
  variant?: "text";
  color?: "primary" | "assistive";
  size?: "medium" | "small";
}

type ButtonStyleProps =
  | SolidButtonStyle
  | OutlinedButtonStyle
  | TextButtonStyle;
```

- `ButtonAttrProps`
  - `ButtonHTMLAttributes<HTMLButtonElement>` 확장
  - **사용자 지정 타입 외에 button이 기본적으로 가지는 attr을 사용**하기 위함

`ButtonAttrProps`는 모든 버튼이 공유한다. Style Props의 타입을 선언할 때, `ButtonAttrProps`를 확장하도록 구상했다.

- `ButtonStyleProps`
  - SolidButtonStyle
  - OutlinedButtonStyle
  - TextButtonStyle

Style Props는 OR(|) 연산자를 이용한 유니온 타입으로 지정했다.
종류는 variant에 따라 나눴다.

variant 값에 따라 나머지 type들이 조건부로 지정되는 것을 예상했으나,
모든 타입값이 넘어왔다.
(variant="text"인 경우, color는 "primary" 또는 "assistive"만 가능하다)

![[스크린샷 2024-09-12 오후 10.00.09.png]]

'우아한 타입 스크립트 with 리액트' 책에 비슷한 예시가 있었다.
결론부터 말하면, 타입을 구분해서 넣는 사용자의 의도와는 다르게 정확한 타입을 반환하지 못한다. 인자로 넣는 타입에 알맞은 타입을 반환하고 싶지만, **타입 설정이 유니온 타입으로만 되어있기 때문에 타입 스크립트는 해당 타입에 맞는 정확한 타입을 추론할 수 없다**.

인자에 따라 반환되는 타입을 다르게 설정하려면 **extends를 사용한 조건부 타입**을 활용해야 한다.

#### 2. 두번째 시도

`extends를 사용한 조건부 타입` 사용하기

```tsx
interface ButtonAttrProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: string | ReactNode;
}

interface SolidButtonStyle {
  color?: "primary";
  size?: "large" | "medium" | "small";
}

interface OutlinedButtonStyle {
  color?: "primary" | "secondary" | "assistive";
  size?: "large" | "medium" | "small";
}

interface TextButtonStyle {
  color?: "primary" | "assistive";
  size?: "medium" | "small";
}

interface ButtonVariantType {
  variant?: "solid" | "outlined" | "text";
}

// 조건부 타입
type ButtonStyleType<T extends ButtonVariantType["variant"]> = T extends "solid"
  ? SolidButtonStyle
  : T extends "outlined"
  ? OutlinedButtonStyle
  : T extends "text"
  ? TextButtonStyle
  : never;

// 제네릭 타입
const Button = <T extends ButtonVariantType["variant"]>({
  variant = "solid",
  color = "primary",
  size = "medium",
  disabled,
  onClick,
  children,
  ...props
}: ButtonAttrProps & ButtonStyleType<T> & { variant?: T }) => {
  return (
    <PrimitiveButton
      className={`button button--${variant}-${color} button--${size}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </PrimitiveButton>
  );
};
```

- ButtonVariantType
  - 조건부 타입
  - `variant`에 따라 적절한 스타일 타입을 적용할 수 있도록 유도
- ButtonStyleType
  - 제네릭 타입
  - `ButtonAttrProps`와 `ButtonStyleType`을 결합
  - 컴포넌트를 제네릭 `<T extends ButtonVariantType["variant"]>`으로 선언하여 `variant` 값에 따라 타입을 추론하도록 유도
- React.FC 제거
  - TypeScript에서 제네릭 컴포넌트와 `React.FC` 타입 정의 간의 호환성 문제 때문
  - `React.FC`는 제네릭 타입을 명시적으로 지원하지 않음
  - 제네릭 타입을 지정하려면 **직접 정의된 타입**을 사용

야호 성공했다.
(variant='solid'일 때, color는 "primary"만 가능하다. 타입스크립트가 정확하게 타입을 유추하는 중)

![[스크린샷 2024-09-13 오후 9.53.25.png]]

### 레퍼런스

- https://github.com/marspal/mars-ui/blob/master/src/components/Button/_style.scss
- [주니어의 Atomic design & Storybook 도전기](https://velog.io/@yyeonggg/%EC%A3%BC%EB%8B%88%EC%96%B4%EC%9D%98-Atomic-design-Storybook-%EB%8F%84%EC%A0%84%EA%B8%B0)
- 우아한 타입 스크립트 with 리액트 - 5장 타입 활용하기

---

## 2. Icon 컴포넌트

![[스크린샷 2024-09-13 오후 11.31.32.png]]

### 요약

- 사용한 패키지
  - SVGR
- size props
  - `width`와 `height` 속성에 직접 접근
  - 이유: `Button`처럼 css style로 구현하지 않는 이유는 icon은 svg이기 때문이다.
- color props
  - 부모의 color를 상속받음
  - 이유: icon은 독자적으로 색상을 가지는 경우는 드물기 때문

### 폴더 구조

```
Icon
ㄴ assets
	ㄴ color
	ㄴ navigation
	ㄴ normal
ㄴ Icon.stories.tsx
ㄴ Icon.tsx
ㄴ _icon.scss
ㄴ icons.ts
ㄴ  index.ts
```

#### assets

![[스크린샷 2024-09-23 오후 9.52.11.png]]

아이콘의 이미지 assets은 아이콘 컴포넌트 폴더에서 관리한다.

- 종류
  - color
  - normal
  - navigation
- 특이 사항
  - `<path>`의 fill값을 `currentColor`로 수정
  - 파일명은 피그마 export한 그대로

#### icons.ts

```ts
/* src/components/atoms/Icon/icons.tsx */
import { ReactComponent as Android } from "./assets/normal/Name=android.svg";
import { ReactComponent as Apps } from "./assets/normal/Name=apps.svg";
import { ReactComponent as ArrowUp } from "./assets/normal/Name=arrowUp.svg";
import { ReactComponent as Bell } from "./assets/normal/Name=bell, Fill=False.svg";

export const icons = { Android, Apps, ArrowUp, Bell };
```

- svg 이미지를 import하고 객체에 담아 export
- 구현 방법
  - `SVGR`을 사용해서 svg 파일을 ReactComponent로 변환
  - Component를 객체에 담아 export

### Props

- Style Props
  - icon: {`keyof typeof icons`} 아이콘 종류 (icons는 icons.ts에서 import한 객체)
  - size: {"tiny" | "small" | "medium" | "large" | "normal" | number} 아이콘 크기
- Attribute Props
  - label: {string} 아이콘 레이블
  - className: {string} 아이콘 클래스명
  - ...props: SVG 기본 attr

### 타입

1. `SVGProps<SVGSVGElement>` 상속

```tsx
export interface IconStyleProps extends SVGProps<SVGSVGElement> {
  /** 아이콘 종류 */
  icon: IconName;
  /** 아이콘 크기 */
  size?: IconSize;
  /** 아이콘 레이블 */
  label?: string;
  /** 아이콘 클래스명 */
  className?: string;
}
```

2. icon props type 지정하기

```tsx
import { icons } from "./icons";

const iconSizeMap = {
  tiny: 16,
  small: 20,
  medium: 28,
  large: 32,
  normal: 24,
};

export type IconName = keyof typeof icons;
export type IconSize = keyof typeof iconSizeMap | number;
```

![[스크린샷 2024-09-23 오후 10.11.57.png]]

- 문제상황: 200개 가까이 되는 `icon` 이름 props를 일일이 작성하는건 비효율적이라고 판단
- 해결방법: `keyof typeof` 연산자 사용

keyof는 객체의 키값을 타입으로 추출한다.
typeof는 변수 또는 속성의 타입을 추론한다.
`keyof typeof 객체`는 **객체의 키를 추출하여 타입으로 사용**하겠다는 의미이다.
TypeScript가 스스로 객체를 읽고 타입을 지정하기 때문에 일일이 작성하지 않아도 되었으며, 휴먼 에러를 방지할 수 있었다.

### 구현하며 겪은 문제

#### 1) SVGR 컴포넌트 담아낸 객체 사용

- 문제사항: icons라는 변수에 SVGR 컴포넌트를 담았는데, 어떻게 렌더하지
- 해결방법: SVGR 컴포넌트를 변수에 담아 태그로 사용

```tsx
/* src/components/atoms/Icon/Icon.tsx */
import { icons } from "./icons"; // SVGR 컴포넌트가 담긴 객체

const Icon: React.FC<SvgIconProps> = ({
  icon,
  size = "normal",
  label,
  className,
  ...props
}) => {
  const SVGIcon = icons[icon]; // 객체의 값 = SVGR 컴포넌트

  return (
    <i className={`icon ${className || ""}`}>
      <SVGIcon {...props} />
    </i>
  );
};
```

icons 객체의 값은 SVGR 컴포넌트다.
`React.FunctionComponent<React.SVGProps<SVGSVGElement>`

props로 전달 받은 icon은 icons 객체의 키다.
icons 객체에 키를 전달해서 값에 저장된 SVGR 컴포넌트를 불러온 뒤, 태그로 사용한다!

렌더링하여 사용할 때, props를 자유롭게 설정할 수 있도록 props를 태그에 전달하였다.
그리고 icon임을 직관적으로 마크업에 나타낼 수 있도록 `<i> 태그`를 사용했다.

#### 2) 중요도에 따라 웹 접근성 설정하기

- 문제상황: aria-label과 aria-hidden을 어떻게 토글하지?
- 해결방법: 객체 리터럴과 삼항연산자를 사용

```tsx
/* src/components/atoms/Icon/Icon.tsx */
const Icon: React.FC<SvgIconProps> = ({
	icon,
	size = "normal",
	label,
	className,
	...props
}) => {
	const SVGIcon = icons[icon];
	const ariaProps = label
		? { "aria-label": label } // label이 있는 경우, aria-label을 설정(중요도 표현)
		: { "aria-hidden": true }; // label이 없는 경우, aria-hidden을 설정(오직 데코용)

	return (
		<i
			className={`icon ${className || ""}`}
			{...ariaProps} {/* props 설정 */}
		>
			<SVGIcon width={getSize(size)} height={getSize(size)} {...props} />
		</i>
	);
};
```

- 아이콘의 중요도가 높으면, aria-label에 설정한 값을 스크린리더가 읽고
- 아이콘의 중요도가 낮으면, 오직 데코를 위하여 존재하므로 스크린리더가 무시

실무에서 자주 지적당하던 내용이다. 뼈에 세겨졌는지 아이콘 기획할때 이 내용을 가장 먼저 고민을 했다.

처음엔 아래 코드처럼 hidden props와 label props를 받아올 생각이었다.

```tsx
const ariaHidden = hidden ? { "aria-hidden": true } : "";
const arialabel = label ? { "aria-label": label } : "";
```

가만보니 코드 구조가 반복되어서 `삼항연산자`를 이용하면 코드가 간결해질 것 같은데 알듯 말듯해서 결국 챗GPT의 도움을 받았다.

label 하나로 값을 설정하면 되었다. 나 자신에게 화가 나기도 하고 머리가 굳은건가 심각하게 고민도 했지만, 일단 되면 된 거 아닌가!
label 여부에 따라 `aria-label` 또는 `aria-hidden`을 설정하도록 구현했다.

### 레퍼런스

- https://github.com/marspal/mars-ui/blob/master/src/components/Icon/index.tsx
- [React Custom Icon Component 개발기](https://tech.socarcorp.kr/dev/2022/09/06/react-icon-component.html)
- [Creating your custom SVG Icon library in React](https://medium.com/@mateuszpalka/creating-your-custom-svg-icon-library-in-react-a5ff1c4c704a)
- [Reusable SVG Icon Component with React and Typescript](https://www.youtube.com/watch?v=0pGrmzuPHUI)

---

## 3. Icon Button 컴포넌트 제작

![[스크린샷 2024-09-24 오전 12.04.19.png]]

### 요약

- button size props
  - 문자형일 경우
    - 클래스명 추가
    - `icon-button--{solid/outlined/background/normal}
  - 숫자형일 경우
    - 컴포넌트의 style props에 css 코드 삽입
- Icon 크기
  - size props에 숫자값 전달
  - 이유: Icon은 대부분 custom size를 사용

### 폴더구조

```
IconButton
 ┣ IconButton.stories.tsx
 ┣ IconButton.tsx
 ┣ _iconButton.scss
 ┗ index.tsx
```

### className 규칙

- `icon-button`
- `icon-button--{variant}`
  - variant: solid/outlined/background/normal
- `icon-button--{size}`
  - size: normal/small
  - 또는 숫자형 입력하여 style을 수정 (custom size)

### Props

- label: {string} 컴포넌트의 aria-label
- variant: {"solid" | "outlined" | "background" | "normal"} 버튼 스타일
- size: {"normal" | "small" | number} 버튼 크기
- icon: {`keyof typeof icons`} 아이콘 종류
- disabled: {boolean} 사용자 인터렉션
- className: {string} 추가 클래스명
- onClick: 클릭 이벤트

### 타입

- `ButtonHTMLAttributes<HTMLButtonElement>` 상속
- 상속 이유: type, data-attr 외의 button이 기본적으로 가지는 attr을 상속받기 위함

### 구현하며 겪은 문제들

#### 1) color props 지정하기

- 문제상황: IconButton은 color props가 필요하지 않은데, PrimitiveButton은 color가 필수값임
- 해결방법: Omit 유틸타입 적용
  - 첫번째 시도: 옵셔널 타입으로 지정
  - 두번째 시도: type을 `never`로 지정
  - 세번째 시도: Omit 유틸타입 적용

```tsx
/* src/components/atoms/IconButton/IconButton.tsx */
interface IconButtonStyleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  // color 제외!
  // 타입들
}
```

처음에는 props에 color를 추가하고 옵셔널 타입으로 지정하면 되겠다 싶었다. 하지만 사용하지 않을 props을 굳이 선언할 이유가 없었다.

그래서 챗 GPT에 물어봤더니, never를 추천해줬다. 만약, never를 적용할 props가 5개 이상이면, 일일이 타입에 never라고 선언해야할까?

https://github.com/marspal/mars-ui/blob/master/src/components/Button/_style.scss 레포지토리를 둘러보다보니까, Omit이라는 type을 발견했다.

존재는 알고 있었지만, 이런 용도로 사용하는구나 확 체감이 되었다.

#### 2) Icon size

- 문제상황: IconButton의 custom size에서 icon 크기를 어떻게 지정하지?
- 해결방법: size props(아이콘 버튼의 크기 props)의 type이 string이면 지정된 값을 전달하고, type이 number면 (버튼크기 - 16px) 값을 전달

```tsx
/* src/components/atoms/IconButton/IconButton.tsx */
const getIconSize = (buttonSize: IconButtonSize) => {
  if (typeof buttonSize === "string") {
    switch (buttonSize) {
      case "normal":
        return 20;
      case "small":
        return 18;
      default:
        return 18;
    }
  }

  if (typeof buttonSize === "number") {
    return buttonSize - 16;
  }
};

const IconButton: React.FC<IconButtonStyleProps> = (
  {
    // ...props
  }
) => {
  const iconSize = { size: getIconSize(size) };

  return (
    <PrimitiveButton {...props}>
      <Icon className="icon-button--icon" icon={icon} {...iconSize} />
      <span className="icon-button--interaction"></span>
    </PrimitiveButton>
  );
};
```

IconButton의 size props는 `normal`, `small` 또는 number를 받는다.
그리고 IconButton의 Icon의 크기는 숫자로 받는다.

값이 숫자면 아이콘의 크기는 (size - 16)로,
값이 문자면 문자에 매칭되는 아이콘 크기를 반환하도록 설정했다.

---

## 4. Floating Button

![[스크린샷 2024-09-24 오전 12.04.36.png]]

### 요약

- IconButton을 재사용

### 폴더구조

```
FloatingButton
 ┣ FloatingButton.stories.tsx
 ┣ FloatingButton.tsx
 ┣ _floatingButton.scss
 ┗ index.tsx
```

### Props

- label: {string} 컴포넌트의 aria-label
- icon: {`keyof typeof icons`} 아이콘 종류
- disabled: {boolean} 사용자 인터렉션
- className: {strong} 추가 클래스명
- onClick: 클릭 이벤트

### 타입

- `ButtonHTMLAttributes<HTMLButtonElement>` 상속
- 상속 이유: type, data-attr 외의 button이 기본적으로 가지는 attr을 상속받기 위함

### 구현하며 겪은 문제들

#### icon size 설정하기

- 문제상황: 시안의 아이콘은 24px이나, IconButton의 아이콘 크기는 (buttonSize - 16px)로 시안보다 크다
- 해결방법: IconButton 컴포넌트에서 icon의 최대 크기를 24px로 설정
- 이유: IconButton이 48px보다 큰 경우는 거의 없다. 만약 이런 상황이 발생하면, 그때 대응하자.

---

## 5. Avatar 컴포넌트 제작

![[스크린샷 2024-09-24 오전 12.05.57.png]]

### 폴더구조

```
Avatar
 ┣ assets
 ┃ ┣ academic.svg
 ┃ ┣ company.svg
 ┃ ┗ person.svg
 ┣ Avatar.stories.tsx
 ┣ Avatar.tsx
 ┣ _avatar.scss
 ┗ index.tsx
```

#### assets

- 사용하는 아바타 svg 이미지를 저장

### 아바타 종류

- person
- company
- academic

### className 규칙

- `avatar-wrapper`
- `avatar-wrapper--${variant}`
  - variant: person/company/academic
- `avatar-wrapper--${size}`
  - size: xsmall/small/medium/large/xlarge
- `avatar-wrapper--border`
  - 이미지가 있으면 border가 적용됨
  - path && `avatar-wrapper--border`

### Props

- variant: {"person" | "company" | "academic"} 아바타 종류
- size: {"xsmall" | "small" | "medium" | "large" | "xlarge"} 아바타 크기
- userName: {string} 이미지의 alt 속성 값
- path: {string} 이미지의 src 속성 값
- className: {string} 추가 클래스명

### 컴포넌트 구조

```tsx
const Avatar: React.FC<AvatarStyleProps> = ({
  variant,
  size = "medium",
  userName,
  path,
  className,
}) => {
  return (
    <PrimitiveAvatar.Root
      className={classNames(
        "avatar-wrapper",
        `avatar-wrapper--${variant}`,
        `avatar-wrapper--${size}`,
        path && "avatar-wrapper--border",
        className
      )}
    >
      <PrimitiveAvatar.Image
        className="avatar--image"
        src={path}
        alt={`${userName}의 프로필 이미지`}
      />

      <PrimitiveAvatar.Fallback className="avatar--fallback" delayMs={600}>
        <img
          src={getFallbackImage(variant)}
          alt={`${userName}의 프로필 이미지`}
        />
      </PrimitiveAvatar.Fallback>
    </PrimitiveAvatar.Root>
  );
};
```

- root
  - image
    - 유저 아바타 이미지
  - fallback
    - 대체 이미지
    - 유저가 등록한 아바타 이미지가 없는 경우

### 구현하며 겪은 문제들

#### size style 구현하기

- 문제상황: 모든 사이즈를 클래스로 선언하기엔 양도 많고 휴먼에러 발생할 위기
- 해결방법: scss의 each 메소드 사용

```scss
/* src/components/atoms/Avatar/_avatar.tsx */
$iconSize: (
  xsmall: 24,
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 56,
);

.avatar-wrapper {
  display: block;
  overflow: hidden;

  // 다른 스타일들
  ...

	// size
	@each $key, $val in $iconSize {
    &--#{$key} {
      width: #{$val}px;
      height: #{$val}px;
    }
  }
}
```

---

## 6. Avatar Button 컴포넌트 제작

![[스크린샷 2024-09-24 오전 7.29.07.png]]

### 요약

- `Avatar` 재사용

### 폴더구조

```
AvatarButton
 ┣ AvatarButton.stories.tsx
 ┣ AvatarButton.tsx
 ┣ _avatarButton.scss
 ┗ index.tsx
```

### Props

- Avatar 컴포넌트의 props를 그대로 사용
  - variant: {"person" | "company" | "academic"} 아바타 종류
  - size: {"xsmall" | "small" | "medium" | "large" | "xlarge"} 아바타 크기
  - userName: {string} 이미지의 alt 속성 값
  - path: {string} 이미지의 src 속성 값
  - className: {string} 추가 클래스명
- onClick: 클릭 이벤트

### 타입

- 교차타입
  - AvatarStyleProps & AvatarButtonAttrProps
    - AvatarButtonAttrProps
      - `ButtonHTMLAttributes<HTMLButtonElement>` 상속
    - AvatarStyleProps
      - Avatar 컴포넌트의 `AvatarStyleProps` 상속
- 상속 이유: 버튼의 attr을 상속하고, Avatar의 props를 그대로 전달하기 위해

```tsx
/* src/components/atoms/AvatarButton/AvatarButton.tsx */
type AvatarButtonProps = AvatarStyleProps & AvatarButtonAttrProps;

const AvatarButton: React.FC<AvatarButtonProps> = ({
  variant,
  size = "medium",
  userName,
  path,
  className,
  onClick,
}) => {
  return (
    <PrimitiveButton
      className={classNames("avatar-button", className)}
      onClick={onClick}
    >
      <Avatar variant={variant} size={size} userName={userName} path={path} />
    </PrimitiveButton>
  );
};
```

---

## 7. AvatarGroup 컴포넌트 제작

![[스크린샷 2024-09-24 오전 7.28.51.png]]

### 폴더구조

```
📦AvatarGroup
 ┣ 📂json
 ┃ ┣ 📜company.json
 ┃ ┗ 📜person.json
 ┣ 📜AvatarGroup.stories.tsx
 ┣ 📜AvatarGroup.tsx
 ┣ 📜_avatarGroup.scss
 ┗ 📜index.tsx
```

- json 폴더
  - mock 데이터를 모아둔 폴더

### Props

- avatars
  - 아바타 정보를 담은 배열
  - 타입: `AvatarStyleProps[]`

### 구현하며 겪은 문제들

#### 겹치는 레이아웃 구현

- 문제상황: 아바타가 왼쪽에 있을수록 레이어가 상위에 있음
- 해결방법: scss의 for를 이용해서 z-index 설정

```scss
$item-limit: 5;

.avatar-item {
  @for $i from 1 to $item-limit {
    &:nth-child(#{$i}) {
      position: relative;
      z-index: $item-limit - $i;
    }
  }
}
```

---

## 8. Checkbox 컴포넌트 제작

![[스크린샷 2024-09-24 오전 7.34.31.png]]

### 폴더구조

```
Checkbox
 ┣ Checkbox.stories.tsx
 ┣ Checkbox.tsx
 ┣ _checkbox.scss
 ┗ index.tsx
```

### checkbox 종류

- square
- round
- ghost

### className 규칙

- `checkbox`
- `checkbox--${variant}`
  - variant: square/round/ghost
- `checkbox--${size}`
  - size: normal/small

### Props

- id : {string} label과 매칭되는 ID
- variant : {"square" | "round" | "ghost"} checkbox 모양
- size: {"normal" | "small"} checkcbox 크기
- state: {boolean} checkbox 상태
- disabled: {boolean} checkbox 상호작용
- required: {boolean} checkbox 필수 항목
- name: {string} FormData key
- onChange: (e) => void, checkbox 이벤트

### 타입

- 교차타입 `CheckboxAttrProps & CheckboxStyleProps`
  - CheckboxAttrProps
    - `Omit<InputHTMLAttributes<HTMLInputElement>, "size">` 상속
    - id
    - state
    - onChange
  - CheckboxStyleProps
    - variant
    - size

### checkbox 구조

```tsx
<!-- NOTE: root, 실제 클릭 범위 -->
<PrimitiveCheckbox.Root className="checkbox" >
	<!-- NOTE: box, unchecked 스타일 적용 -->
	<div className="checkbox--box">
		<CheckIcon classmName="checkbox--icon" variant={variant} size={size} />
		<!-- NOTE: indicator, checked일 때에만 출력, checked 스타일 적용 -->
		<PrimitiveCheckbox.Indicator className="checkbox--indicator">
			<CheckIcon classmName="checkbox--icon" variant={variant} size={size} />
		</PrimitiveCheckbox.Indicator>
	</div>

	<div className="checkbox--interaction" aria-hidden></div>
</PrimitiveCheckbox.Root>
```

- root
  - className: `checkbox`
  - 실제 클릭 범위
- box
  - indicator 크기 설정
  - unchecked 스타일 적용
    - checked indicator가 unchecked indicator 위를 덮으므로 overflow hidden 설정
    - border는 inset box-shadow로 설정
- indicator
  - checked 스타일 적용
    - position을 absolute로 설정 + 가운데 정렬
    - unchecked 스타일의 checkbox--box 위를 덮어서 가림

### 구현하며 겪은 문제들

#### 1) UI render

- 문제상황: checkbox를 클릭해도 UI가 변경되지 않음
- 해결방법: 내부에 state 설정

```tsx
const Checkbox: React.FC<CheckboxPropsType> = ({ state = false }) => {
  const [checked, setChecked] = useState<StateType>(state); // state 선언

  return (
    <PrimitiveCheckbox.Root
      checked={checked}
      onCheckedChange={() => setChecked(!checked)} // state 변경
    >
      <PrimitiveCheckbox.Indicator>
        <Icon icon="CheckThick" />
      </PrimitiveCheckbox.Indicator>
    </PrimitiveCheckbox.Root>
  );
};

export default Checkbox;
```

사용자의 클릭에 따라 인터렉션이 구현되어야 한다.
당연히 ui를 리렌더 하려면 내부 state가 변경되어야 한다.

기초적인 부분에서 헤맸기 때문에 너무나 분했다.

- checked state 선언
- radix의 Checkbox 컴포넌트에서 제공하는 onCheckedChange 속성에 setState 선언

input의 onChange를 구현하기 위해, Radix UI에서 checkbox의 change 이벤트를 지원하는 `onCheckedChange` API reference를 사용했다.

#### 2) change event 주입

- 문제상황: 조상 컴포넌트에서 change Event를 추가하고 싶다면?
- 해결방법: onChange props를 입력받고, onCheckedChange에서 실행

```tsx
const Checkbox: React.FC<CheckboxPropsType> = ({
  state = false,
  onChange, // onChange 입력받고
}) => {
  const [checked, setChecked] = useState<StateType>(state);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) onChange(); // onChange 실행
  };

  return (
    <PrimitiveCheckbox.Root checked={checked} onCheckedChange={handleChange}>
      <PrimitiveCheckbox.Indicator>
        <Icon icon="CheckThick" />
      </PrimitiveCheckbox.Indicator>
    </PrimitiveCheckbox.Root>
  );
};

export default Checkbox;
```

토스트가 등장하거나 다음 레벨로 넘어가는 등 사용자의 인터렉션에 따라 여러가지 이벤트가 발생할 수 있으므로 change event를 주입하였다.

처음에는 onChange 실행문만 적어두었는데, onChange가 전달되지 않는 경우에 에러가 발생했다. 그래서 onChange가 있는 경우에만 실행하도록 if문을 구성했다.

#### 3) style 구현

- 문제상황: indicator는 checked 될 때에만 등장하는데, unchecked/checked 스타일을 어떻게 지정하지?
- 해결방법: indicator를 감싸는 box 요소를 생성하고, unchecked 스타일을 box에 설정

---

## 9. RadioGroup & Radio 컴포넌트 제작

![[스크린샷 2024-09-24 오전 7.59.43.png]]

### 요약

- Radio 컴포넌트는 RadioGroup 컴포넌트 내에서만 사용가능
  - 이유
    - Radix의 primitive ui는 Radio.Root와 Radio.Item을 제공하는데, Item은 Root없이 호출할 수 없다.
    - 재사용을 위해 Root와 Item을 각각 RadioGroup 컴포넌트, Radio 컴포넌트로 구현했다.
  - 결론
    - Radio 컴포넌트를 호출하려면, RadioGroup 컴포넌트로 감싸야 한다.
    - 부모자식 관계를 폴더구조로 표현
      - RadioGroup 폴더 내부에 Radio 폴더를 추가
- Radio의 컴포넌트 구조는 Checkbox 컴포넌트 구조와 유사하게 구현

### 폴더구조

```
RadioGroup
 ┣ Radio
 ┃ ┣ Radio.stories.tsx
 ┃ ┣ Radio.tsx
 ┃ ┣ _radio.scss
 ┃ ┗ index.tsx
 ┣ json
 ┃ ┗ fruits.json
 ┣ RadioGroup.tsx
 ┣ _radioGroup.scss
 ┗ index.tsx
```

- Radio
  - Radio 컴포넌트 폴더
- json
  - mock 데이터를 담아둔 폴더

### Radio Group 컴포넌트

#### Props

- value: string, radio group 값
- disabled: boolean, radio 상호작용
- required: boolean, radio 필수 항목
- name: string, radio name
- loop: boolean, 키보드 탐색
- children: ReactNode, radio 그룹의 custom Children
- onChange: (e) => void, radio 이벤트

### Radio 컴포넌트

#### Props

- `RadioItemDataType`
  - fetching한 데이터에 적용할 type
  - `Omit<InputHTMLAttributes<HTMLInputElement>, "size">` 상속
- `RadioPropsType`
  - `Omit<RadioItemProps, "text">`
    - Radio에선 text props 사용하지 않으므로 drop

```tsx
// text => Radio를 선언할 때 사용하지 않음. fetching한 데이터에는 포함됨.
export interface RadioItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  value: string;
  text: string;
  disabled?: boolean;
  size?: RadioSizeType;
  className?: string;
}

export type RadioPropsType = Omit<RadioItemProps, "text">;
```

---

## 10. Switch 컴포넌트 제작

![[스크린샷 2024-09-24 오전 8.48.39.png]]

### 폴더구조

```
Switch
 ┣ Switch.stories.tsx
 ┣ Switch.tsx
 ┣ _switch.scss
 ┗ index.tsx
```

### className 규칙

- `switch`
- `switch--${size}
  - size: normal/small
- `switch--thumb-{size}`
  - size: normal/small

### Props

- size: {"small" | "medium"} switch 크기
- id: {string} label과 매칭되는 ID
- active: {boolean} switch 상태
- disabled: {boolean} switch 상호작용
- onChange: (e) => void, switch 이벤트

---

## 11. ToggleIconButton 컴포넌트 제작

![[스크린샷 2024-09-24 오전 8.48.50.png]]

### 폴더구조

```
ToggleButton
 ┣ ToggleIconButton.stories.tsx
 ┣ ToggleIconButton.tsx
 ┣ _toggleIconButton.scss
 ┗ index.tsx
```

### UI 구조

- Radix UI에서 Toggle 사용
- Icon 컴포넌트 재사용

```tsx
<Toggle.Root
  className={classNames(
    "toggle-icon-button",
    toggle && "toggle-icon-button--active",
    className
  )}
  type="button"
  pressed={toggle}
  value={value}
  aria-label={`${label} ${toggle ? "체크됨" : ""}`}
  onPressedChange={handleToggle}
  {...props}
>
  <Icon icon={iconName} />
</Toggle.Root>
```

- root
  - button으로 rendering 된다.

처음에는 IconButton 컴포넌트를 재사용해서 구현했다.
거의 다 완성했을 즈음, **웹 접근성을 잊어버린 것**을 깨달았다.
그래서 **Radix에서 Toggle UI**를 찾아서 다시 구조를 짰다.

Radix의 Toggle 컴포넌트로 IconButton 컴포넌트를 감싸는 구조였지만, 두 컴포넌트가 모두 button으로 렌더링되어 동일한 태그가 중첩되는 문제가 발생했다.
그래서 IconButton 컴포넌트를 Icon 컴포넌트로 교체했다.

### className 규칙

- `active`가 `true`일 경우, `toggle-icon-button--active` 클래스 추가

### Props

- active: {boolean} toggle 상태
- icon: {`keyof typeof icons`} icon 컴포넌트 종류
- value: {string} toggleIconButton 값
- label: {string} toggleIconButton 문구
- onToggle: (pressed: boolean, value: string) => void, oggleIconButton 이벤트
- className: {string} 추가 클래스명

### 타입

- 교차타입 `ToggleIconButtonStyleProps & ToggleIconButtonAttrProps`
  - ToggleIconButtonStyleProps`
    - `Pick<IconStyleProps, "icon">` 확장
    - active
  - `ToggleIconButtonAttrProps`
    - `ComponentPropsWithoutRef<typeof Toggle.Root>` 확장
    - value
    - label
    - onToggle

### 구현하며 겪은 문제들

#### type error

- 문제 상황: ref, type 에러 발생
- 해결 방법: ComponentPropsWithoutRef와 Pick 유틸타입 사용

```tsx
export interface ToggleIconButtonStyleProps
  extends Pick<IconStyleProps, "icon"> {
  active: boolean;
}

export interface ToggleIconButtonAttrProps
  extends ComponentPropsWithoutRef<typeof Toggle.Root> {
  value: string;
  label: string;
  onToggle?: (pressed: boolean, value: string) => void;
}
```

1. `ButtonHTMLAttributes<HTMLButtonElement>`를 확장했더니 에러가 발생했다. `Radix UI`의 `Toggle.Root` 컴포넌트는 일반적으로 `HTMLButtonElement`에 대응하지 않고, `type` 속성을 받지 않기 때문이다. 이에, **type을 명시적으로 선언**했다.
2. 또다시 ref가 필요하다는 type 에러가 발생했다. Radix UI의 컴포넌트는 일반적으로 React의 `forwardRef`를 사용하여 작성되었기 때문이다. 그러므로 **ComponentPropsWithoutRef 타입을 사용**하여 ref 에러를 잠재웠다.
3. 하지만 또다시 props에 의한 에러가 발생했다. IconStyleProps를 확장했기 때문인데, icon의 props를 그대로 사용하기 위한 목적이었으나, 불필요한 prop까지 가져오게 되어 에러가 발생한 것이었다. 필요없는 props까지 함께 적용되지 않도록 **Pick 유틸타입**을 써서 icon type만을 가져오니 모든 에러가 해결되었다.

꼭 필요한 타입만을 가져오는 것이 중요하다는 것을 배웠다. 더불어, Pick 유틸함수는 명시적으로 표기되어 편하다! 여러개의 props를 가져오는 경우에는 좀 더 생각해보아야 겠지만, 2~3개의 prop만이 필요한 경우에는 적극적으로 사용해야겠다.

---

## 12. Overlay 컴포넌트 제작

![[스크린샷 2024-09-24 오전 9.04.47.png]]

### 요약

- Dialog 컴포넌트 내부에 쓰일 컴포넌트
- 제작 이유
  - Dialog는 종류가 다양하지만 **Overlay는 항상 동일**하다.
  - radix-ui의 primivite UI 중에 Dialog 컴포넌트로 구현할 계획인데, Dialog.Overlay에 Overlay 컴포넌트를 재사용할 것이다!(asChild 속성 선언)

### 폴더구조

```
Overlay
 ┣ Overlay.stories.tsx
 ┣ Overlay.tsx
 ┣ _overlay.scss
 ┗ index.tsx
```

---

## 13. Divider 컴포넌트 제작

![[스크린샷 2024-09-24 오전 9.05.02.png]]

### 요약

- radix-ui
  - `@radix-ui/react-separator`
  - `Separator` 컴포넌트 사용

### 폴더구조

```
Divider
 ┣ Divider.stories.tsx
 ┣ Divider.tsx
 ┣ _divider.scss
 ┗ index.tsx
```

### className 규칙

- `divider`
- `divider--${orientation}-${size}`
  - orientation: horizontal/vertical
  - size: normal/thick

### Props

- orientation: {"horizontal" | "vertical"} divider 방향
- size: {"normal" | "thick"} divider 두께
- decorative: {boolean} divider 꾸밈용

### 구현하며 겪은 문제들

#### style 구현

- 문제상황: 비슷한 코드가 반복됨
- 해결방법: divider의 두께는 매개변수에 따라 값을 return하는 function을 이용 & divider의 방향에서 중복되는 스타일은 mixin으로 구현

```scss
$divider-normal: 1px;
$divider-thick: 12px;

// size return하는 함수
@function getDividerSize($size) {
  @if ($size == "thick") {
    @return $divider-thick;
  }

  @return $divider-normal;
}

// orientation에 따라 코드블럭을 return하는 믹신
@mixin divider($orientation, $size) {
  @if ($orientation == "horizontal") {
    width: 100%;
    height: getDividerSize($size);
  }

  @if ($orientation == "vertical") {
    width: getDividerSize($size);
    height: 100%;
  }
}

.divider {
  background-color: $line-normal-alternative;

  &--horizontal-normal {
    @include divider("horizontal", "normal");
  }

  &--horizontal-thick {
    @include divider("horizontal", "thick");
  }

  &--vertical-normal {
    @include divider("vertical", "normal");
  }

  &--vertical-thick {
    @include divider("vertical", "thick");
  }
}
```

---

## 14. AspectRatio 컴포넌트 구현

![[스크린샷 2024-09-24 오전 9.09.39.png]]

### 요약

- 제작 이유
  - 컴포넌트 단계에서 ratio를 확인할 수 있도록 유도
  - ratio를 확인하기위해 style 파일을 찾아가는 루트를 줄이고자 함
- radix UI
  - `@radix-ui/react-aspect-ratio` 사용

### 폴더구조

```
AspectRatio
 ┣ AspectRatio.stories.tsx
 ┣ AspectRatio.tsx
 ┣ _aspectRatio.scss
 ┗ index.tsx
```

### props

- ratio: {number} ratio 비율
- className: {string} container 클래스명

### 타입

- `PropsWithChildren` 확장
  - AspectRatio 컴포넌트는 className, ratio 외의 props를 받지 않음
  - style 외에 다른 설정을 추가하지 못하도록 설정

---

## 15. Mask 컴포넌트 구현

![[스크린샷 2024-09-24 오전 9.14.26.png]]

### 요약

- 제작 이유
  - 모달, tag-group 등 에서 자주 등장하므로 통일된 스타일 구현을 위해 UI로 제작

### Props

- rotate: {"top" | "right" | "bottom" | "left"} mask 위치

### 타입

- `HTMLAttributes<HTMLDivElement>`를 확장
  - Mask는 position과 height가 필요하므로, 추가적인 클래스를 지정할 수 있도록 className을 props로 전달받음

---

# **Layout 컴포넌트**

![[스크린샷 2024-09-24 오전 9.18.12.png]]

## 1. Container & Col 컴포넌트 구현

### 요약

- Col 컴포넌트는 Container 컴포넌트 내에서만 사용가능
  - 이유
    - bootstrap의 grid 시스템과 최대한 유사하게 구현하고 싶었다
      - 익숙한 구조인 container/row/column 구조를 차용
      - Container 컴포넌트 = container & row
      - Col 컴포넌트 = column
  - 결론
    - Col 컴포넌트를 호출하려면, Container 컴포넌트로 감싸야 한다.
      - 그렇지 않으면, 스타일이 깨진다.
    - 부모자식 관계를 폴더구조로 표현
      - Container 폴더 내부에 Col 폴더를 추가

### Container 컴포넌트

#### 타입과 Props

- `HTMLAttributes<HTMLDivElement>`
  - className: 스타일 추가를 위해 선언
  - ...props: 기능 구현에 필요한 값을 위해 선언

### Col 컴포넌트

#### 타입과 Props

- `HTMLAttributes<HTMLDivElement>` 확장
  - className: 스타일 추가를 위해 선언
  - xs: 1 | 2, 모바일 columns
  - sm: 1 | 2 | 3, 태블릿 columns
  - md: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, 데스크탑 columns

---

## 2. Dialog

![[스크린샷 2024-09-24 오전 9.21.57.png]]
![[스크린샷 2024-09-24 오전 9.22.28.png]]

### 폴더구조

```
Dialog
 ┣ Dialog.stories.tsx
 ┣ Dialog.tsx
 ┣ _dialog.scss
 ┗ index.tsx
```

### DialogContent 컴포넌트

Dialog에 필요한 요소는 다음과 같다.

- overlay
- content
- trigger
- close

구조는 다음과 같다.

- root
  - trigger
  - overlay
  - content
    - close

root 내에 trigger, overlay, content를 포함하고 있어야 Primitive UI에서 기본적으로 제공하는 기능을 사용할 수 있다.

Dialog는 trigger, content의 변동이 크다. close도 언제든 사용할 수 있어야 한다.
**스타일을 마음대로 바꾸고 위치 상관없이 사용할 수 있는 자율성이 필요한 요소가 있다**.

자율성을 살리기위해, Primitive UI를 그대로 export 하기로 했다.

```tsx
// src/components/layouts/Dialog/Dialog.tsx

export const Dialog = PrimitiveDialog.Root;
export const DialogTrigger = PrimitiveDialog.Trigger;
export const DialogClose = PrimitiveDialog.Close;
export const DialogTitle = PrimitiveDialog.Title;
```

trigger를 위치 상관없이 사용하도록, Dialog도 함께 export 했다.
Dialog 태그가 trigger를 감싸야지 모달이 정상적으로 열리기 때문이다.

다음은 사용예시다.

```tsx
<Dialog>
	<!-- NOTE: 트리거, 모달 열림 -->
	<DialogTrigger>
		<Button>Normal 모달 트리거</Button>
	</DialogTrigger>

	<!-- NOTE: 모달 콘텐츠, 모달 내용 -->
	<DialogContent title={args.title} type={args.type}>
		<p>예시 모달은 간단하게 만들어어보앗어용</p>

		<footer style={{ display: "flex", columnGap: "4px", marginTop: "24px" }} >
			<DialogClose style={{ flexGrow: 1 }} asChild>
				<Button variant="outlined">취소</Button>
			</DialogClose>

			<DialogClose style={{ flexGrow: 1 }} asChild>
				<Button>확인</Button>
			</DialogClose>
		</footer>
	</DialogContent>
</Dialog>

```

### Props

- title: {string} 모달 이름
- type: {"notice" | "normal"} 모달 종류

### 레퍼런스

- [Radix - Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
- [클린한 모달 사용하기 - 모달과 컴포넌트의 분리](https://velog.io/@seungchan__y/%ED%81%B4%EB%A6%B0%ED%95%9C-%EB%AA%A8%EB%8B%AC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EB%AA%A8%EB%8B%AC%EA%B3%BC-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%EB%B6%84%EB%A6%AC#%F0%9F%A7%BC-2%EC%B0%A8-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81---%EB%AA%A8%EB%8B%AC-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%93%A4%EC%9D%84-%EC%83%81%ED%83%9C%EA%B0%92%EC%9C%BC%EB%A1%9C-%EB%B3%B4%EA%B4%80%ED%95%98%EA%B8%B0)

---

# **회고**

- 가장 많이 바뀐 부분은 모든 것을 내가 직접 구현하지 않고 라이브러리를 적극적으로 사용하게되었다는 것이다. 원티트 프리온보딩에서 멘토님이 말씀하셨다. 마니아 성향의 개발자는 퇴사하면 거대한 레거시코드를 남긴다고. 그래서 라이브러리를 마구 사용했다. 물론, 필요한 라이브러리를 선별해서! 작업하면서 공식문서도 있고 모르는 부분은 구글링하면 되니까 무지 편하다는 생각이 들었다. 실무는 여러명이 같이 작업하니까 이런 유연한 생각과 태도가 필수라는걸 다시 한 번 상기할 수 있었다.

- 코드를 작성하면서 가장 많이 고민한 부분은 `무슨 동작을 하면 어떤 결과를 보여줄 것이다` 였다. 이에 따라 필요한 props를 정리하고 컴포넌트의 구조를 짰다. 그 후 동작을 구현하고 스타일을 구현했다. 큰 골격부터 세우다보니, 방향이 잡혀 작업 속도가 빨라졌다. 사실, button을 구현하는데 9시간이 걸렸다. 그 원인은 props를 먼저 고민했기 때문이다. 전체 골조가 없으니 방향을 잃고 모양을 잃어버려 처음부터 다시 시작하느라 시간이 오래 걸렸던 것이다. presentational ui라 로직이 거의 없다싶이한데, 그럼에도 불구하고 나의 문제점을 발견하고 교정하기 아주 좋은 기회였다.

- 타입스크립트에서 유틸리티 함수가 왜 필요한지 이해가 싹 되는 경험이었다. 정말 필요한 props만을 선별하기 위해 Pick을 하거나 Omit을 하는 과정이 무지 재밌었다. 포트폴리오를 작성하면서 button의 조건부타입을 다시 수정하게 되는데, 너무 고생해서 그런지 삼항연산자와 extends를 사용법에 자신감이 붙었다. 그리고 막연히 알고있던 keyof와 typeof도 명확한 쓰임을 정리할 수 있었다.

- 컴포넌트 구현하는 것보다 theme 구현하는게 더 어려웠다. 눈에 안보이는데, 여기저기서 사용되는 모양새가 산소랑 비슷했다. 산소를 그림으로 그리라고하면 억울한 조세호님이 되는 것 처럼, 눈에 보이지 않는 걸 코드로 표현하려고 하니까 무지막지하게 어렵고 복잡했다. 사용성에 기준을 두고, 역계산법으로 구조를 짜본건 처음이다. SCSS 변수로 사용하려면 어떻게 로직을 세워야 하는가를 고민하면서, 연결고리를 찾아내는게 왜그렇게 어려운지! 하지만 끝까지 해낸 내 자신이 너무 자랑스럽다. 하하.
