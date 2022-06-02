export function download(filename: string, text: string) {
    var element = document.createElement('a')
    const data = 'data:text/jsoncharset=utf-8,' + encodeURIComponent(text)
    element.setAttribute('href', data)
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}
