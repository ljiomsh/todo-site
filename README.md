# Todo Calendar App

React + TypeScript + Vite + Supabase로 구축된 할 일 관리 캘린더 애플리케이션입니다.

## 주요 기능

- 📅 월별 캘린더 뷰
- ✅ 할 일 추가, 수정, 삭제, 완료 토글
- 🏷️ 태그 시스템으로 할 일 분류
- 🔍 태그별 필터링
- 📱 반응형 디자인
- ☁️ Supabase 백엔드 연동

## 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Supabase (PostgreSQL)
- **Styling**: CSS3 with Tailwind CSS classes
- **State Management**: React Hooks

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성합니다.
2. 프로젝트 설정에서 API URL과 anon key를 복사합니다.
3. 프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. 데이터베이스 스키마 설정

Supabase 대시보드의 SQL Editor에서 `supabase-schema.sql` 파일의 내용을 실행하여 데이터베이스 테이블을 생성합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── api/           # Supabase API 함수들
├── components/    # React 컴포넌트들
├── lib/          # Supabase 클라이언트 설정
├── types.ts      # TypeScript 타입 정의
└── utils.ts      # 유틸리티 함수들
```

## API 함수

- `createTodo()` - 새 할 일 생성
- `getTodos()` - 모든 할 일 조회
- `getTodosByDate()` - 특정 날짜의 할 일 조회
- `updateTodo()` - 할 일 수정
- `deleteTodo()` - 할 일 삭제
- `toggleTodo()` - 할 일 완료 상태 토글

## 데이터 타입

```typescript
interface Todo {
  id: number
  text: string
  tags: string[]
  completed: boolean
  date: string
  createdAt: string
}
```
