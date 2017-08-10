(function () {
    /**
     * <ez-pagination> represents a pagination in the application.
     * This element fires an event to fetch new page after clicking on
     * one of the page. The event is listened in <ez-asynchronous-block>
     * so make sure your pagination is inside of it, or you have to provide
     * your own update handling.
     *
     * Expample:
     *
     * ```
     * <ez-pagination
     *     back-url="/load/page/4"
     *     next-url="/load/page/6"
     *     current-page="5"
     *     pages-urls='{"1": "/url1","5": "/url5","6": "/url6","7": "/url7",
     *         "8": "/url8","9": "/url9","13": "/url13"}'
     * ></ez-pagination>
     * ```
     *
     * @polymerElement
     * @demo demo/ez-pagination.html
     */
    class Pagination extends Polymer.Element {
        static get is() {
            return 'ez-pagination';
        }

        static get properties() {
            return {
                /**
                 * The button back url.
                 */
                backUrl: {
                    type: String,
                    value: '',
                },

                /**
                 * The button next url.
                 */
                nextUrl: {
                    type: String,
                    value: '',
                },

                /**
                 * The current page number.
                 */
                currentPage: {
                    type: Number,
                    value: 0,
                    observer: '_updateButtons'
                },

                /**
                 * The array of all pages urls.
                 */
                pagesUrls: {
                    type: Object,
                    value: {},
                    observer: '_filterUrls'
                },

                /**
                 * The array of urls to render.
                 */
                urlsToRender: {
                    type: Array,
                    value: []
                }
            };
        }

        /**
         * Filters the urls of pages.
         *
         * @param {Array} pagesUrls
         */
        _filterUrls(pagesUrls) {
            const keys = Object.keys(pagesUrls);
            const lastPageNumber = parseInt(keys[keys.length - 1], 10);
            const urlsToRender = [];

            keys.forEach((pageNumber, index) => {
                if (parseInt(pageNumber) === lastPageNumber && !pagesUrls[lastPageNumber - 1]) {
                    urlsToRender.push({
                        isSeparator: true
                    });
                }

                urlsToRender.push({
                    url: pagesUrls[pageNumber],
                    pageNumber: parseInt(pageNumber, 10),
                    currentClass: this.currentPage === parseInt(pageNumber, 10) ? 'ez-pagination-current-page' : ''
                });

                if (parseInt(pageNumber) === parseInt(keys[0]) && !pagesUrls[parseInt(pageNumber) + 1]) {
                    urlsToRender.push({
                        isSeparator: true
                    });
                }

            });

            this.backUrl = pagesUrls[this.currentPage - 1];
            this.nextUrl = pagesUrls[this.currentPage + 1];
            this.urlsToRender = urlsToRender;
        }

        /**
         * Update the buttons state.
         */
        _updateButtons() {
            const keys = Object.keys(this.pagesUrls);
            const lastPageNumber = parseInt(keys[keys.length - 1], 10);

            this.shadowRoot.querySelector('.button-back').disabled = this.currentPage === 1;
            this.shadowRoot.querySelector('.button-next').disabled = this.currentPage === lastPageNumber;
        }

        /**
         * Dispatches event to change page.
         *
         * @param {Event} event facade
         */
        _fireUpdateEvent(event) {
            event.preventDefault();

            this.dispatchEvent(new CustomEvent('ez:pagination:update', {
                detail: {
                    url: event.target.getAttribute('href')
                },
                bubbles: true
            }));
        }
    }

    window.customElements.define(Pagination.is, Pagination);
})();
