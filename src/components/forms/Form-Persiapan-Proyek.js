import React from 'react';
import moment from 'moment';
import { DatePicker, Input,  Radio, Typography } from 'antd';


const { Text } = Typography;

class FormPersiapanProyek extends React.Component {
    constructor(props) {
		super(props);
        this.state ={
            jenisNominal: 'Baru'
        }

        this.dataPersiapanProyek = {};
    }

    onChangeJenisNominalDiajukan = (e) => {
        this.setState({jenisNominal: e.target.value});
    }

    handleChangeNilaiText = (e) => {
		switch(e.currentTarget.dataset.jenis) {
			case 'nopersiapan':
				this.dataPersiapanProyek.nopersiapan = e.currentTarget.value;
				break;
            case 'nojob':
                this.dataPersiapanProyek.nojob = e.currentTarget.value;
                break;
            case 'nominaldiajukan':
                this.dataPersiapanProyek.nominaldiajukan = e.currentTarget.value;
                break;
			default:
		}
	}

    handleChangeTanggal = (date, dateString, jenis) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.dataPersiapanProyek.tglpersiapan = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
	}

    render() {
        const { jenisNominal } = this.state;
        let page =
        <table className="table-container-persiapan-baru">
            <tbody>
                <tr>
                    <td style={{paddingBottom: 16}}>
						<div className="table-container-cel-persiapan-baru">
							<Text strong className="item-label">Tanggal</Text>
							<DatePicker 
								format="DD-MM-YYYY"
								defaultValue={ moment('2015/01/01') }
								onChange={ this.handleChangeTanggal }
							/>
						</div>
					</td>
                    <td>
						<div className="table-container-cel-persiapan-baru">
							<Text strong className="item-label">No. Persiapan</Text>
							<Input 
								data-jenis="nopersiapan"
								onChange={this.handleChangeNilaiText}
							/>
						</div>
					</td>
                </tr>
                <tr>
                    <td style={{paddingBottom: 16}}>
						<div className="table-container-cel-persiapan-baru">
							<Text strong className="item-label">No. Job</Text>
							<Input 
								data-jenis="nojob"
								onChange={this.handleChangeNilaiText}
							/>
						</div>
					</td>
                </tr>
                <tr>
                    <td style={{paddingBottom: 16}}>
						<div className="table-container-cel-persiapan-baru">
							<Text strong className="item-label">Nominal Persiapan</Text>
							<Input 
								data-jenis="nominaldiajukan"
								onChange={this.handleChangeNilaiText}
							/>
						</div>
					</td>
                    <td style={{paddingBottom: 16}}>
						<div className="table-container-cel-persiapan-baru">
							<Text strong className="item-label">Jenis Persiapan</Text>
							<Radio.Group onChange={this.onChangeJenisNominalDiajukan} value={jenisNominal} style={{marginTop: 4}}>
                                <Radio value={'Baru'}>Baru</Radio>
                                <Radio value={'Reimburse'}>Reimburse</Radio>
                            </Radio.Group>
						</div>
					</td>
                </tr>
            </tbody>
        </table>;

        return(page);
    }
}

export default FormPersiapanProyek;