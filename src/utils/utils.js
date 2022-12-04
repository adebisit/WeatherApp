export const friendlyTodaysDate = () => {
    let options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const today = new Date()
    return today.toLocaleDateString('GMT', options)
}