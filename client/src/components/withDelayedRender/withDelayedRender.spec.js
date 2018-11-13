import React from "react";
import { mount } from "enzyme";
import withDelayedRender from "./withDelayedRender";

const Base = props => <div />;
const delay = 100;
const Sample = withDelayedRender(delay)(Base);

describe("component decorated with withDelayedRender", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Sample />);
  });

  it("should render null first", () => {
    expect(wrapper).toBeEmptyRender();
  });

  it("should render after delay", done => {
    setTimeout(() => {
      expect(wrapper).toHaveHTML("<div></div>");
      done();
    }, delay + 50);
  });

  describe("when shouldRender is true", () => {
    it("should render null first", () => {
      expect(wrapper.setProps({ shouldRender: true })).toBeEmptyRender();
    });

    it("should render null before delay", done => {
      wrapper.setProps({ shouldRender: true });
      setTimeout(() => {
        expect(wrapper).toBeEmptyRender();
        done();
      }, delay - 50);
    });

    it("should render after delay", done => {
      wrapper.setProps({ shouldRender: true });
      setTimeout(() => {
        expect(wrapper).toHaveHTML("<div></div>");
        done();
      }, delay + 50);
    });

    describe("when shouldRender changes to false", () => {
      it("should render null", () => {
        wrapper.setProps({ shouldRender: true });
        wrapper.setProps({ shouldRender: false });
        expect(wrapper).toBeEmptyRender();
        expect(wrapper.children().length).toEqual(0);
      });

      xit("should render null after delay", done => {
        const wr = mount(<Sample shouldRender={true} />);
        console.log(wr.html());

        /*
        setTimeout(() => {
          wr.setProps({ shouldRender: false });
        }, delay + 50);
        setTimeout(() => {
          console.log(wr.children().html());
          expect(wr.find(<Base />)).toExist();
          done();
        }, delay + 100);

        */
      });
    });
  });

  describe("when shouldRender is false", () => {
    it("should render null first", () => {
      expect(wrapper.setProps({ shouldRender: false })).toBeEmptyRender();
    });

    it("should render null after delay", done => {
      wrapper.setProps({ shouldRender: false });
      setTimeout(() => {
        expect(wrapper).toBeEmptyRender();
        done();
      }, delay + 50);
    });
  });
});
