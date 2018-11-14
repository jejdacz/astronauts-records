import React from "react";
import { mount } from "enzyme";
import delayedRender from "./delayedRender";

const Base = props => <div />;
const delay = 100;
const Sample = delayedRender(delay)(Base);

describe("component decorated with withDelayedRender", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Sample />);
  });

  it("should have prop shouldRender set to default (true)", () => {
    expect(wrapper).toHaveProp("shouldRender", true);
  });

  describe("when shouldRender is true", () => {
    it("should render nothing first", () => {
      expect(wrapper.html()).toBeNull();
    });

    it("should render nothing before delay", done => {
      setTimeout(() => {
        expect(wrapper.html()).toBeNull();
        done();
      }, delay - 50);
    });

    it("should render content after delay", done => {
      setTimeout(() => {
        expect(wrapper.html()).not.toBeNull();
        done();
      }, delay + 50);
    });

    describe("when shouldRender changes to false within delay", () => {
      it("should render nothing", done => {
        setTimeout(() => {
          wrapper.setProps({ shouldRender: false });
          expect(wrapper.html()).toBeNull();
          done();
        }, delay - 50);
      });

      describe("when shouldRender changes to false after delay", () => {
        it("should render nothing", done => {
          setTimeout(() => {
            wrapper.setProps({ shouldRender: false });
            expect(wrapper.html()).toBeNull();
            done();
          }, delay + 50);
        });
      });
    });

    describe("when shouldRender is false", () => {
      it("should render nothing first", () => {
        expect(mount(<Sample shouldRender={false} />)).toBeEmptyRender();
      });

      it("should render nothing after delay", done => {
        setTimeout(() => {
          expect(mount(<Sample shouldRender={false} />)).toBeEmptyRender();
          done();
        }, delay + 50);
      });

      describe("when shouldRender changes to true", () => {
        it("should render content after delay", done => {
          setTimeout(() => {
            wrapper.setProps({ shouldRender: true });
            expect(wrapper.html()).toBeNull();
          }, 50);

          setTimeout(() => {
            expect(wrapper.html()).not.toBeNull();
            done();
          }, 50 + delay + 50);
        });
      });
    });
  });
});
