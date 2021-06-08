import React from 'react';

class FormPengajuanProyek extends React.Component {
    render() {
        let page =
        <table className="table-container-pengajuan-baru">
            <tbody>
                <tr>
                    <td style={{paddingBottom: 16}}>
						<div className="table-container-cel-pengajuan-baru">
							<Text strong className="item-label">Tgl. usulan</Text>
							<DatePicker 
								format="DD-MM-YYYY"
								defaultValue={moment(detailReimburse.tglusul)}
								onChange={
									(date, dateString) => 
									this.handleChangeTanggal(date, dateString, "tglusul")
								}
							/>
						</div>
					</td>
                </tr>
            </tbody>
        </table>;

        return(page);
    }
}

export default FormPengajuanProyek;