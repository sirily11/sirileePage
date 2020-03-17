import { ContentElement } from './tableOfContent';
import { RawDraftContentBlock, RawDraftContentState } from 'draft-js';


describe("Test get level", () => {
    test("Test level", () => {
        let block: RawDraftContentBlock = { key: "", text: "hello", depth: 0, type: "header-one", data: "", inlineStyleRanges: [], entityRanges: [] }
        let level = ContentElement.getHeaderValue(block)
        expect(level).toEqual(1)
    })

    test("Test level", () => {
        let block: RawDraftContentBlock = { key: "", text: "hello", depth: 0, type: "header-two", data: "", inlineStyleRanges: [], entityRanges: [] }
        let level = ContentElement.getHeaderValue(block)
        expect(level).toEqual(2)
    })

    test("Test level", () => {
        let block: RawDraftContentBlock = { key: "", text: "hello", depth: 0, type: "header-three", data: "", inlineStyleRanges: [], entityRanges: [] }
        let level = ContentElement.getHeaderValue(block)
        expect(level).toEqual(3)
    })

    test("Test level", () => {
        let block: RawDraftContentBlock = { key: "", text: "hello", depth: 0, type: "header-four", data: "", inlineStyleRanges: [], entityRanges: [] }
        let level = ContentElement.getHeaderValue(block)
        expect(level).toEqual(4)
    })

    test("Test level", () => {
        let block: RawDraftContentBlock = { key: "", text: "hello", depth: 0, type: "header-five", data: "", inlineStyleRanges: [], entityRanges: [] }
        let level = ContentElement.getHeaderValue(block)
        expect(level).toEqual(5)
    })

    test("Test level", () => {
        let block: RawDraftContentBlock = { key: "", text: "hello", depth: 0, type: "header-six", data: "", inlineStyleRanges: [], entityRanges: [] }
        let level = ContentElement.getHeaderValue(block)
        expect(level).toEqual(6)
    })
})

describe("test parse element", () => {
    /**
     * # header 
     * ## header 
     * # header 
     * ### header
     * #### header
     * #### header
     * ##### header
     */

    let contents: RawDraftContentState = {
        blocks: [
            { key: "", text: "hello", depth: 0, type: "header-one", data: "", inlineStyleRanges: [], entityRanges: [] },
            { key: "", text: "hello", depth: 0, type: "header-two", data: "", inlineStyleRanges: [], entityRanges: [] },
            { key: "", text: "hello", depth: 0, type: "header-one", data: "", inlineStyleRanges: [], entityRanges: [] },
            { key: "", text: "hello", depth: 0, type: "header-three", data: "", inlineStyleRanges: [], entityRanges: [] },
            { key: "", text: "hello", depth: 0, type: "header-four", data: "", inlineStyleRanges: [], entityRanges: [] },
            { key: "", text: "hello", depth: 0, type: "header-four", data: "", inlineStyleRanges: [], entityRanges: [] },
            { key: "", text: "hello", depth: 0, type: "header-five", data: "", inlineStyleRanges: [], entityRanges: [] }
        ],
        entityMap: {}
    }

    test("Convert to element tree", () => {
        let root = ContentElement.constructElementTree(contents)
        expect(root.children.length).toEqual(2)
        expect(root.children[0].level).toEqual(1)
        expect(root.children[0].children[0].level).toEqual(2)
        expect(root.children[1].children.length).toEqual(1)
    })


})