export type WikipediaSearchResponse = {
    query: {
        searchInfo: {
            totalHits: number
        },
        search: WikipediaSearchItem[],
    },
}

export interface WikipediaSearchItem {
    ns: number,
    title: string,
    pageId: number,
    size: number,
    wordcount: number,
    snippet: string,
    timestamp: string,
}

export interface WikipediaImagesResponse {
    query: {
        pages: {
            [key: string]: {
                pageId: number,
                ns: 0,
                title: string,
                images: Array<{
                    ns: number,
                    title: string,
                }>
            }
        }
    }
}
