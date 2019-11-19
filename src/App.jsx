import React from 'react';
import '../node_modules/normalize.css/normalize.css';
import './styles/main.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leftOperand: null,
			rightOperand: null,
			operation: null,
			display: 0,
			isTotaled: false,
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		const operand = e.target.innerHTML;
		switch (operand) {
			case 'AC':
				this.clearAll();
				break;
			case '=':
				this.calculateForDisplay();
				break;
			case '+/-':
				this.positiveOrNegative();
				break;
			case '%':
				this.percent();
				break;
			case '+':
			case '-':
			case 'x':
			case '/':
				this.setOperation(operand);
				break;
			default:
				this.applyNumberOrDecimal(operand);
		}
	}

	setOperation(operand) {
		const { rightOperand, operation, isTotaled, display } = this.state;
		if (!operation && rightOperand === null) {
			if (isTotaled) {
				this.setState({
					operation: operand,
					isTotaled: false,
					leftOperand: display,
				});
				return;
			}
			this.setState({ operation: operand });
		}
	}

	applyNumberOrDecimal(operand) {
		const { leftOperand, rightOperand, operation, isTotaled } = this.state;
		if (Number(operand) || operand === '0' || operand === '.') {
			let clear = {};
			if (isTotaled) {
				clear = {
					leftOperand: null,
					rightOperand: null,
					operation: null,
					display: 0,
					total: 0,
					isTotaled: false,
				};
			}
			if (operation && rightOperand === null) {
				// set to rightOperand and return
				this.setState({ ...clear, rightOperand: operand, display: operand });
				return;
			}
			if (operation && rightOperand !== null && rightOperand.length < 8) {
				// set to rightOperand + operand and return
				this.setState({
					...clear,
					rightOperand: rightOperand + operand,
					display: rightOperand + operand,
				});
			}
			if (!operation && leftOperand === null) {
				// set to leftOperand and return
				this.setState({ ...clear, leftOperand: operand, display: operand });
				return;
			}
			if (!operation && leftOperand !== null && leftOperand.length < 8) {
				// set to leftOperand + operand and return
				this.setState({
					...clear,
					leftOperand: leftOperand + operand,
					display: leftOperand + operand,
				});
			}
		}
	}

	percent() {
		const { display, leftOperand, rightOperand } = this.state;
		const number = (Number(display) / 100).toString();
		if (leftOperand !== null && rightOperand !== null) {
			this.setState({
				rightOperand: number,
				display: number,
			});
			return;
		}
		this.setState({
			leftOperand: number,
			display: number,
		});
	}

	positiveOrNegative() {
		const { display, leftOperand, rightOperand } = this.state;
		const number = (Number(display) * -1).toString();
		if (leftOperand !== null && rightOperand !== null) {
			this.setState({
				rightOperand: number,
				display: number,
			});
			return;
		}
		this.setState({
			leftOperand: number,
			display: number,
		});
	}

	clearAll() {
		this.setState({
			leftOperand: null,
			rightOperand: null,
			operation: null,
			display: 0,
			isTotaled: false,
		});
	}

	calculateForDisplay() {
		const total = this.calculate().toString();
		this.setState({
			display: total,
			leftOperand: null,
			rightOperand: null,
			operation: null,
			isTotaled: true,
		});
	}

	calculate() {
		const { leftOperand, rightOperand, operation } = this.state;
		let total = 0;
		if (!operation && leftOperand === null) return 0;
		if (!operation && leftOperand !== null) return leftOperand;
		if (operation && leftOperand !== null && rightOperand === null)
			return leftOperand;
		if (operation && leftOperand !== null && rightOperand !== null) {
			switch (operation) {
				case '+':
					total = Number(leftOperand) + Number(rightOperand);
					if (total.toString().includes('.'))
						return Number.parseFloat(total.toPrecision(8).toString());
					return total;
				case '-':
					total = Number(leftOperand) - Number(rightOperand);
					if (total.toString().includes('.'))
						return Number.parseFloat(total.toPrecision(8).toString());
					return total;
				case 'x':
					total = Number(leftOperand) * Number(rightOperand);
					if (total.toString().includes('.'))
						return Number.parseFloat(total.toPrecision(8).toString());
					return total;
				case '/':
					total = Number(leftOperand) / Number(rightOperand);
					if (total.toString().includes('.'))
						return Number.parseFloat(total.toPrecision(8).toString());
					return total;
				default:
					return total;
			}
		}
		return 0;
	}

	render() {
		const { display } = this.state;
		return (
			<main>
				<section className="calc-container">
					<div className="calc-display">{display}</div>
					<div className="calc-button-container">
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							AC
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							+/-
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							%
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							/
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							7
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							8
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							9
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							x
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							4
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							5
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							6
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							-
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							1
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							2
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							3
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							+
						</button>
						<button
							type="button"
							className="calc-button calc-button__zero"
							onClick={this.onClick}
						>
							0
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							.
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							=
						</button>
					</div>
				</section>
			</main>
		);
	}
}

export default App;
