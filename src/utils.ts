// 날짜 관련 유틸리티 함수
export const dateUtils = {
    getMonthDays(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate()
    },

    getFirstDayOfMonth(year: number, month: number): number {
        return new Date(year, month, 1).getDay()
    },

    formatDate(date: Date): string {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    },

    isToday(date: Date): boolean {
        const today = new Date()
        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
    }
} 