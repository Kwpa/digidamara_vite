import { h } from 'start-dom-jsx';

const BaseWebsite = () => {
    return(
      <div class="base">
        <div class="fixed-header">
          <section class="section">
            <div class="container">
              <div class="heading">
                <h1 class="title has-text-white">Section</h1>
                <h2 class="subtitle">
                  A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
                </h2>
              </div>
            </div>
          </section>
        </div>
        <div class="fixed-footer">
          <div>
            <h1>Footer</h1>
            <button class="button">Footer</button>
          </div>
        </div>
      </div>
    )
}

export default BaseWebsite