import React from 'react';

const OrderDetails = ({ form, setForm }) => {
  const { fName, lName, email, address } = form || {};

  const changeHandler = ({ target: { id, value } }) => {
    setForm({ ...form, [id]: value });
  };

  return (
    <>
      <h4 className="mb-3 text-center">Billing address</h4>
      <div>
        <div className="row g-3">
          <div className="col-sm-4">
            <label htmlFor="fName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="fName"
              value={fName}
              disabled
            />
            <div className="invalid-feedback">
              Valid first name is required.
            </div>
          </div>

          <div className="col-sm-4">
            <label htmlFor="lName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lName"
              value={lName}
              disabled
            />
            <div className="invalid-feedback">
              Valid last name is required.
            </div>
          </div>

          <div className="col-sm-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              disabled
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={changeHandler}
            />
            <div className="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>
        </div>

        <br />
      </div>
    </>
  );
};

export default OrderDetails;
