-- Supabase 데이터베이스 스키마
-- 이 SQL을 Supabase 대시보드의 SQL Editor에서 실행하세요

-- todos 테이블 생성
CREATE TABLE IF NOT EXISTS public.todos (
    id BIGSERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    completed BOOLEAN DEFAULT FALSE,
    date TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_todos_date ON public.todos(date);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON public.todos(created_at);
CREATE INDEX IF NOT EXISTS idx_todos_completed ON public.todos(completed);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 todos 테이블에 접근할 수 있도록 정책 설정
-- (인증이 필요한 경우 이 정책을 수정하세요)
CREATE POLICY "Enable all operations for all users" ON public.todos
    FOR ALL USING (true);

-- 또는 인증된 사용자만 접근하도록 하려면:
-- CREATE POLICY "Enable all operations for authenticated users" ON public.todos
--     FOR ALL USING (auth.role() = 'authenticated');
