import React from 'react';
import PropTypes from 'prop-types';
import {mobileEvents} from "./events";

import './ADDEditMobileClient.css';

class ADDEditMobileClient extends React.PureComponent {

    static propTypes = {
        workMode: PropTypes.number,   // 1- редактировать, 2- добавить.
        info:PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
        newID: PropTypes.number,
    };

    state = {
        info: this.props.info,
    };

    componentWillReceiveProps = (newProps) => {
        this.setState({info:newProps.info});
    };

    newTextRefFam = null;
    newTextRefIm = null;
    newTextRefOtch = null;
    newTextRefBalance = null;


    setNewTextRefFam = (ref) => {
        this.newTextRefFam=ref;
    };
    setNewTextRefIm = (ref) => {
        this.newTextRefIm=ref;
    };
    setNewTextRefOtch = (ref) => {
        this.newTextRefOtch=ref;
    };
    setNewTextRefBalance = (ref) => {
        this.newTextRefBalance=ref;
    };

    onButtonSaveClickEvent = () => {
        mobileEvents.emit('EMobileClientOnButtonSaveClick',this.state.info);
    };

    onButtonSave = () => {

        if ( this.newTextRefFam &&this.newTextRefIm && this.newTextRefOtch && this.newTextRefBalance) {

            this.setState({
                info: {
                    id: (this.props.workMode === 1 ? this.props.info.id : this.props.newID),
                    fam: this.newTextRefFam.value,
                    im: this.newTextRefIm.value,
                    otch: this.newTextRefOtch.value,
                    balance: +this.newTextRefBalance.value,
                }
            }, this.onButtonSaveClickEvent);

        }
    };
    onButtonCancel = () => {
        mobileEvents.emit('EMobileClientOnButtonCancelClick',this.state.info);
    };

    render() {
        console.log(`ADDEditMobileClient  render`);

            return (
                <div className="SingleMobileClientEdit">
                    <h2 className="SingleMobileClientTitle">
                        {this.props.workMode === 1 ? 'Edit Mobile Client' : 'Add Mobile Client'}
                    </h2>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <span>ID:</span> {this.props.workMode === 1 ? this.props.info.id : this.props.newID}
                            </td>
                            <td>
                                <span>Фамилия:</span> <input type="text" defaultValue={this.props.info.fam} ref={this.setNewTextRefFam} />
                            </td>
                            <td>
                                <span>Имя:</span> <input type="text" defaultValue={this.props.info.im} ref={this.setNewTextRefIm} />
                            </td>
                            <td>
                                <span>Отчество:</span> <input type="text" defaultValue={this.props.info.otch} ref={this.setNewTextRefOtch} />
                            </td>
                            <td>
                                <span>Баланс:</span> <input type="text" defaultValue={this.props.info.balance} ref={this.setNewTextRefBalance} />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <input type="button" value="Сохранить" className="save" onClick = {this.onButtonSave} />
                    <input type="button" value="Отмена" className="cancel" onClick = {this.onButtonCancel} />
                </div>
            );
    }
}

export default ADDEditMobileClient;