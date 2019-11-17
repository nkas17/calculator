import React from 'react';
import '../node_modules/normalize.css/normalize.css';
import './styles/main.css';

const App = () => (
	<main>
		<section className="calc-container">
			<div className="calc-display">0</div>
			<div className="calc-button-container">
				<button type="button" className="calc-button">
					AC
				</button>
				<button type="button" className="calc-button">
					+/-
				</button>
				<button type="button" className="calc-button">
					%
				</button>
				<button type="button" className="calc-button calc-button__operand">
					/
				</button>
				<button type="button" className="calc-button">
					7
				</button>
				<button type="button" className="calc-button">
					8
				</button>
				<button type="button" className="calc-button">
					9
				</button>
				<button type="button" className="calc-button calc-button__operand">
					x
				</button>
				<button type="button" className="calc-button">
					4
				</button>
				<button type="button" className="calc-button">
					5
				</button>
				<button type="button" className="calc-button">
					6
				</button>
				<button type="button" className="calc-button calc-button__operand">
					-
				</button>
				<button type="button" className="calc-button">
					1
				</button>
				<button type="button" className="calc-button">
					2
				</button>
				<button type="button" className="calc-button">
					3
				</button>
				<button type="button" className="calc-button calc-button__operand">
					+
				</button>
				<button type="button" className="calc-button calc-button__zero">
					0
				</button>
				<button type="button" className="calc-button">
					.
				</button>
				<button type="button" className="calc-button calc-button__operand">
					=
				</button>
			</div>
		</section>
	</main>
);

export default App;
