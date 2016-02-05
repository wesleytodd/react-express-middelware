var React = require('react');
var ReactDOM = require('react-dom');

export default function reactExpressMiddlewareGenerator (options = {}) {
	// Get the element, defaults to body
	options.element = (function (el) {
		if (typeof el === 'string') {
			return window.document.getElementById(el);
		}
		if (typeof el === 'function') {
			return el();
		}
		if (typeof el !== 'undefined') {
			return el;
		}
		return window.document.body;
	})(options.element);

	return function reactExpressMiddleware (req, res, next) {
		res.renderReactComponent = function renderReactComponent (Component, store, done) {
			// store defaults to res.locals
			if (typeof store === 'function') {
				done = store;
			}
			if (typeof store !== 'object') {
				store = res.locals;
			}

			// Create factory for component
			Component = React.createFactory(Component);

			// Render template with string
			ReactDOM.render(Component(...store), options.element, done);
		};
		next();
	};
}
