import React from 'react';

const paymentType = ['Credit Card', 'Debit Card'];

const Payment = ({ handleCredit, creditForm }) => {
  return (
    <>
      <h4 className="mb-3 text-center">Payment</h4>

      <div className="my-3">
        <h6 className="form-label">Payment Type</h6>
        {paymentType.map((paymen, i) => (
          <div className="form-check" key={i}>
            <input
              id={paymen}
              name="paymentMethod"
              type="radio"
              className="form-check-input"
              checked={paymen == creditForm.paymentMethod}
              onChange={() =>
                handleCredit({
                  target: {
                    id: 'paymentMethod',
                    value: paymen,
                  },
                })
              }
              required
            />
            <label className="form-check-label" htmlFor={paymen}>
              {paymen}
            </label>
          </div>
        ))}
      </div>

      <div className="row gy-3">
        <div className="col-md-6">
          <label htmlFor="cc-name" className="form-label">
            Name on card
          </label>
          <input
            type="text"
            className="form-control"
            id="cc-name"
            value={creditForm['cc-name']}
            onChange={handleCredit}
            required
          />
          <small className="text-muted">
            Full name as displayed on card
          </small>
          <div className="invalid-feedback">
            Name on card is required
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="cc-number" className="form-label">
            Credit card number
          </label>
          <input
            type="text"
            className="form-control"
            id="cc-number"
            value={creditForm['cc-number']}
            onChange={handleCredit}
            required
          />
          <div className="invalid-feedback">
            Credit card number is required
          </div>
        </div>

        <div className="col-md-3">
          <label htmlFor="cc-expiration" className="form-label">
            Expiration
          </label>
          <input
            type="text"
            className="form-control"
            id="cc-expiration"
            value={creditForm['cc-expiration']}
            onChange={handleCredit}
            required
          />
          <div className="invalid-feedback">
            Expiration date required
          </div>
        </div>

        <div className="col-md-3">
          <label htmlFor="cc-cvv" className="form-label">
            CVV
          </label>
          <input
            type="text"
            className="form-control"
            id="cc-cvv"
            value={creditForm['cc-cvv']}
            onChange={handleCredit}
            required
          />
          <div className="invalid-feedback">
            Security code required
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">Total Amount</label>
          <input
            type="text"
            className="form-control"
            defaultValue={creditForm['totalAmount']?.fix()}
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default Payment;
