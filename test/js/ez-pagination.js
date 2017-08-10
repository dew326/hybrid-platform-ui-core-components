/* global describe, it, fixture, beforeEach, assert */
describe('ez-pagination', function() {
    'use strict';

    let element;

    beforeEach(function () {
        element = fixture('BasicTestFixture');
    });

    it('should be defined', function () {
        assert.equal(
            window.customElements.get('ez-pagination'),
            element.constructor
        );
    });

    describe('properties', function () {
        describe('`backUrl`', function () {
            it('should be set', function () {
                assert.equal(element.backUrl, '/url6');
            });
        });

        describe('`nextUrl`', function () {
            it('should be set', function () {
                assert.equal(element.nextUrl, '/url8');
            });
        });

        describe('`currentPage`', function () {
            it('should be set', function () {
                assert.equal(element.currentPage, 7);
            });
        });

        describe('`pagesUrls`', function () {
            it('should be set', function () {
                assert.deepEqual(element.pagesUrls, {
                    '1':'/url1',
                    '5':'/url5',
                    '6':'/url6',
                    '7':'/url7',
                    '8':'/url8',
                    '9':'/url9',
                    '13':'/url13'
                });
            });
        });
    });

    describe('render', function () {
        it('should set `urlsToRender` with separators', function () {
            assert.deepEqual(element.urlsToRender, [
                {
                    currentClass: '',
                    pageNumber: 1,
                    url: '/url1'
                },
                {isSeparator: true},
                {
                    currentClass: '',
                    pageNumber: 5,
                    url: '/url5'
                },
                {
                    currentClass: '',
                    pageNumber: 6,
                    url: '/url6'
                },
                {
                    currentClass: 'ez-pagination-current-page',
                    pageNumber: 7,
                    url: '/url7'
                },
                {
                    currentClass: '',
                    pageNumber: 8,
                    url: '/url8'
                },
                {
                    currentClass: '',
                    pageNumber: 9,
                    url: '/url9'
                },
                {isSeparator: true},
                {
                    currentClass: '',
                    pageNumber: 13,
                    url: '/url13'
                },
            ]);
        });

        it('should set `urlsToRender` without separators', function () {
            element.setAttribute('current-page', 4);
            element.setAttribute('pages-urls', JSON.stringify({
                '1':'/url1',
                '2':'/url2',
                '3':'/url3',
                '4':'/url4',
                '5':'/url5',
                '6':'/url6',
                '7':'/url7'
            }));

            assert.deepEqual(element.urlsToRender, [
                {
                    currentClass: '',
                    pageNumber: 1,
                    url: '/url1'
                },
                {
                    currentClass: '',
                    pageNumber: 2,
                    url: '/url2'
                },
                {
                    currentClass: '',
                    pageNumber: 3,
                    url: '/url3'
                },
                {
                    currentClass: 'ez-pagination-current-page',
                    pageNumber: 4,
                    url: '/url4'
                },
                {
                    currentClass: '',
                    pageNumber: 5,
                    url: '/url5'
                },
                {
                    currentClass: '',
                    pageNumber: 6,
                    url: '/url6'
                },
                {
                    currentClass: '',
                    pageNumber: 7,
                    url: '/url7'
                },
            ]);
        });
    });

    describe('buttons', function () {
        it('should render enabled buttons', function () {
            assert.isFalse(element.shadowRoot.querySelector('.button-back').disabled);
            assert.isFalse(element.shadowRoot.querySelector('.button-next').disabled);
        });
        it('should disable back button', function () {
            element.setAttribute('current-page', 1);

            assert.isTrue(element.shadowRoot.querySelector('.button-back').disabled);
        });
        it('should disable next button', function () {
            element.setAttribute('current-page', 13);

            assert.isTrue(element.shadowRoot.querySelector('.button-next').disabled);
        });
    });

    describe('events', function () {
        it('should fire event when clicking on pagination', function (done) {
            document.addEventListener('ez:pagination:update', function (event) {
                assert.equal(
                    event.detail.url,
                    '/url6'
                );

                done();
            });

            element.shadowRoot.querySelector('.button-back').dispatchEvent(new CustomEvent('click'));
        });
    });
});
