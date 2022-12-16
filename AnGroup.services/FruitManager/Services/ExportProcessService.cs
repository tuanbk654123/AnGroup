using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mapster;
using FruitManager.Repositories.Interfaces;

namespace FruitManager.Services
{
    using System;
    using DataAccess.Models;
    using DataAccess.Models.Dto;
    using DataAccess.Pagination.Base;
    using Interfaces;
    using DataAccess.Models.Dto.ExportProcess;
    using DataAccess.ExceptionFilter.Exceptions;
    using FruitManager.Repositories;
    using NPOI.SS.UserModel;
    using NPOI.XSSF.UserModel;
    using System.Globalization;
    using DataAccess.Models.Dto.ExportPrice;
    using NPOI.XSSF.Model;
    using DataAccess.Models.Enum;

    internal sealed class ExportProcessService : IExportProcessService
    {
        private readonly IExportProcessRepository ExportProcessRepository;
        private readonly IExportPriceRepository exportPriceRepository;
        private readonly IExportReportRepository  exportReportRepository;


        public ExportProcessService(IExportProcessRepository ExportProcessRepository, IExportPriceRepository exportPriceRepository = null, IExportReportRepository exportReportRepository = null)
        {
            this.ExportProcessRepository = ExportProcessRepository;
            this.exportPriceRepository = exportPriceRepository;
            this.exportReportRepository = exportReportRepository;
        }

        public async Task<bool> Create(CreateExportProcessDto createExportProcessDto, CancellationToken cancellationToken = default)
        {

            ExportProcess? ExportProcess = new ExportProcess();
            ExportProcess = createExportProcessDto?.Adapt<ExportProcess>();
            ExportProcess.Id = Guid.NewGuid().ToString();
            ExportProcess.SumGreen = (float)(ExportProcess.WeighGreen?.Sum(x => x));
            ExportProcess.SumBlue = (float)(ExportProcess.WeighBlue?.Sum(x => x));
            ExportProcess.SumRed = (float)(ExportProcess.WeighRed?.Sum(x => x));
            ExportProcess.SumOrange = (float)(ExportProcess.WeighOrange?.Sum(x => x));
            ExportProcess.DateExport = ExportProcess.DateExport.AddDays(1);
            var result = await ExportProcessRepository.UpdateAsync(x => x.Id, ExportProcess, true);
            return result;
        }

        public async Task<IPage<ExportProcess>> Search(IPageable pageable, SearchExportProcessDto searchExportProcessDto)
        {
            return await ExportProcessRepository.Search(pageable, searchExportProcessDto);
        }
        public async Task<bool> Update(UpdateExportProcessDto updateExportProcessDto, CancellationToken cancellationToken = default)
        {
            var ExportProcess = updateExportProcessDto.Adapt<ExportProcess>();
            ExportProcess.SumGreen = (float)(ExportProcess.WeighGreen?.Sum(x => x));
            ExportProcess.SumBlue = (float)(ExportProcess.WeighBlue?.Sum(x => x));
            ExportProcess.SumRed = (float)(ExportProcess.WeighRed?.Sum(x => x));
            ExportProcess.SumOrange = (float)(ExportProcess.WeighOrange?.Sum(x => x));
            ExportProcess.DateExport = ExportProcess.DateExport.AddDays(1);
            return await ExportProcessRepository.UpdateAsync(x => x.Id, ExportProcess, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ExportProcess = await ExportProcessRepository.GetByIndexAsync(x => x.Id, id);
            if (ExportProcess != null)
            {
                return await ExportProcessRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }

        public async Task<byte[]> ExportReport(DateTime? fromDate, DateTime? toDate)
        {
            //xử lý tiền dữ liệu
            fromDate = fromDate.Value.AddDays(1);
            toDate = toDate.Value.AddDays(1);
            //====================================
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "ExcelFileTemplate");
            using var memoryStream = new MemoryStream();
            string fileName = @"Report_Export.xlsx";
            // List<ImportProcess> importProcess = await ImportProcessRepository.GetListByIndexAsync(x=>x.DateImport , date.AddDays(1));

            Pageable pageable = new Pageable();
            pageable.PageNumber = 1;
            pageable.PageSize = 1000;
            SearchExportProcessDto searchExportProcessDto = new SearchExportProcessDto();
            searchExportProcessDto.fromDate = fromDate;
            searchExportProcessDto.toDate = toDate;
            var a = await ExportProcessRepository.Search(pageable, searchExportProcessDto);
            List<ExportProcess> exportProcess = (List<ExportProcess>)a.Content;
            if (exportProcess == null)
            {
                return null;
            }
            else
            {
                // --- Below code would create excel file with dummy data----  
                //file.OpenRead();
                using (var fs = new FileStream(Path.Combine(pathToSave, fileName), FileMode.OpenOrCreate, FileAccess.ReadWrite))
                {
                    fs.Position = 0;
                    XSSFWorkbook workbook = new XSSFWorkbook(fs);
                    ISheet excelSheet = workbook.GetSheetAt(0);


                    ICellStyle styleBlodWithBorder = workbook.CreateCellStyle();
                    IFont fontBoldWithBorder = workbook.CreateFont();
                    fontBoldWithBorder.FontName = "Times New Roman";
                    fontBoldWithBorder.FontHeightInPoints = 14;
                    fontBoldWithBorder.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorder.SetFont(fontBoldWithBorder);
                    styleBlodWithBorder.WrapText = true;
                    styleBlodWithBorder.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorder.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorder.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorder.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorder.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorder.BorderBottom = BorderStyle.Thin;
                    //
                    ICellStyle styleBlodWithBorderOrange = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderOrange = workbook.CreateFont();
                    fontBoldWithBorderOrange.FontName = "Times New Roman";
                    fontBoldWithBorderOrange.FontHeightInPoints = 14;
                    fontBoldWithBorderOrange.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderOrange.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderOrange.WrapText = true;
                    styleBlodWithBorderOrange.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderOrange.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderOrange.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderOrange.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderOrange.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderOrange.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderOrange.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderOrange.FillForegroundColor = IndexedColors.LightOrange.Index;
                    //
                    ICellStyle styleBlodWithBorderRed = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderRed = workbook.CreateFont();
                    fontBoldWithBorderRed.FontName = "Times New Roman";
                    fontBoldWithBorderRed.FontHeightInPoints = 14;
                    fontBoldWithBorderRed.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderRed.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderRed.WrapText = true;
                    styleBlodWithBorderRed.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderRed.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderRed.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderRed.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderRed.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderRed.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderRed.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderRed.FillForegroundColor = IndexedColors.Red.Index;

                    //
                    ICellStyle styleBlodWithBorderGreen = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderGreen = workbook.CreateFont();
                    fontBoldWithBorderGreen.FontName = "Times New Roman";
                    fontBoldWithBorderGreen.FontHeightInPoints = 14;
                    fontBoldWithBorderGreen.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderGreen.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderGreen.WrapText = true;
                    styleBlodWithBorderGreen.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderGreen.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderGreen.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderGreen.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderGreen.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderGreen.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderGreen.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderGreen.FillForegroundColor = IndexedColors.LightBlue.Index;
                    //
                    ICellStyle styleBlodWithBorderBlue = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderBlue = workbook.CreateFont();
                    fontBoldWithBorderBlue.FontName = "Times New Roman";
                    fontBoldWithBorderBlue.FontHeightInPoints = 14;
                    fontBoldWithBorderBlue.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderBlue.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderBlue.WrapText = true;
                    styleBlodWithBorderBlue.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderBlue.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderBlue.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderBlue.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderBlue.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderBlue.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderBlue.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderBlue.FillForegroundColor = IndexedColors.Green.Index;
                    //
                    //
                    ICellStyle styleBlodWithBorderYellow = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderYellow = workbook.CreateFont();
                    fontBoldWithBorderYellow.FontName = "Times New Roman";
                    fontBoldWithBorderYellow.FontHeightInPoints = 14;
                    fontBoldWithBorderYellow.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderYellow.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderYellow.WrapText = true;
                    styleBlodWithBorderYellow.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderYellow.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderYellow.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderYellow.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderYellow.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderYellow.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderYellow.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderYellow.FillForegroundColor = IndexedColors.LightYellow.Index;
                    //
                    ICellStyle styleBlodWithBorderTotal = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderTotal = workbook.CreateFont();
                    fontBoldWithBorderTotal.FontName = "Times New Roman";
                    fontBoldWithBorderTotal.FontHeightInPoints = 14;
                    fontBoldWithBorderTotal.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderTotal.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderTotal.WrapText = true;
                    styleBlodWithBorderTotal.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderTotal.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderTotal.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderTotal.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderTotal.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderTotal.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderTotal.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderTotal.FillForegroundColor = IndexedColors.SkyBlue.Index;
                    //style blod
                    ICellStyle styleBlod = workbook.CreateCellStyle();
                    IFont fontBold = workbook.CreateFont();
                    fontBold.FontName = "Times New Roman";
                    fontBold.FontHeightInPoints = 14;
                    fontBold.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlod.SetFont(fontBold);
                    styleBlod.WrapText = true;
                    styleBlod.Alignment = HorizontalAlignment.Center;
                    styleBlod.VerticalAlignment = VerticalAlignment.Center;

                    int count = 4;
                    IRow row;
                    row = excelSheet.GetRow(0);
                    string? formatted = toDate?.ToString("dd/MM/yyyy");
                    row.CreateCell(2).SetCellValue(formatted);
                    row.GetCell(2).CellStyle = styleBlod;


                    float countFruitTotal = 0;
                    float countToCarTotal = 0;
                    double countPaperTotal = 0;
                    double countRealTotal = 0;
                    double countMoenyTotal = 0;
                    CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");   // try with "en-US"

                    // khai báo thêm mới báo cáo
                    ExportReport? ExportReport = new ExportReport();
                    CreateExportReportDto createExportReportDto = new CreateExportReportDto();
                    createExportReportDto.FromDate = fromDate;
                    createExportReportDto.ToDate = toDate;
            
                    for (int i = 0; i < exportProcess.Count; i++)
                    {
                        // lấy thông tin giá
                        SearchExportPriceDto searchExportPriceDto = new SearchExportPriceDto();
                        searchExportPriceDto.fromDate = exportProcess[i].DateExport.AddDays(1);
                        searchExportPriceDto.toDate = exportProcess[i].DateExport.AddDays(1);
                        var b = await exportPriceRepository.Search(pageable, searchExportPriceDto);
                        List<ExportPrice> exportPrices = (List<ExportPrice>)b.Content;
                        ExportPrice exportPrice = new ExportPrice();
                        if (exportPrices != null && exportPrices.Count == 0)
                        {
                           
                            exportPrice.PriceRed = 0;
                            exportPrice.PriceOrange = 0;
                            exportPrice.PriceGreen = 0;
                            exportPrice.PriceBlue = 0;
                        }
                        else
                        {
                            exportPrice = exportPrices[0];
                        }

                        row = excelSheet.CreateRow(count+i*5);
                        string formatted3 = exportProcess[i].DateExport.ToString("dd/MM/yyyy");
                        row.CreateCell(1).SetCellValue(formatted3);
                        row.GetCell(1).CellStyle = styleBlodWithBorder;

                        //
                        row.CreateCell(2).SetCellValue("Kem rớt II");
                        row.GetCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(3).SetCellValue("Cam");
                        row.GetCell(3).CellStyle = styleBlodWithBorderOrange;
                        //
                        row.CreateCell(4).SetCellValue(exportProcess[i].CountOrange);
                        countFruitTotal += exportProcess[i].CountOrange;
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(5).SetCellValue(exportProcess[i].SumOrange);
                        countToCarTotal += exportProcess[i].SumOrange;
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(6).SetCellValue(Math.Round(exportProcess[i].CountOrange * 0.075,0));
                        countPaperTotal += exportProcess[i].CountOrange * 0.075;
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(7).SetCellValue(Math.Round(exportProcess[i].SumOrange -exportProcess[i].CountOrange * 0.075, 0));
                        countRealTotal += exportProcess[i].SumOrange - exportProcess[i].CountOrange * 0.075;
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        string price = double.Parse(exportPrice.PriceOrange.ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(8).SetCellValue(price);
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(Math.Round(exportPrice.PriceOrange * (exportProcess[i].SumOrange - exportProcess[i].CountOrange * 0.075)).ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(9).SetCellValue(price);
                        countMoenyTotal += exportPrice.PriceOrange * (exportProcess[i].SumOrange - exportProcess[i].CountOrange * 0.075);
                        row.GetCell(9).CellStyle = styleBlodWithBorder;

                        //==========================================================================
                        row = excelSheet.CreateRow(count + i * 5 + 1);
                        row.CreateCell(1).CellStyle = styleBlodWithBorder;
                        row.CreateCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(3).SetCellValue("Đỏ");
                        row.GetCell(3).CellStyle = styleBlodWithBorderRed;
                        //
                        row.CreateCell(4).SetCellValue(exportProcess[i].CountRed);
                        countFruitTotal += exportProcess[i].CountRed;
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(5).SetCellValue(exportProcess[i].SumRed);
                        countToCarTotal += exportProcess[i].SumRed;
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(6).SetCellValue(Math.Round(exportProcess[i].CountRed * 0.075, 0));
                        countPaperTotal += exportProcess[i].CountRed * 0.075;
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(7).SetCellValue(Math.Round(exportProcess[i].SumRed - exportProcess[i].CountRed * 0.075, 0));
                        countRealTotal += exportProcess[i].SumRed - exportProcess[i].CountRed * 0.075;
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(exportPrice.PriceRed.ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(8).SetCellValue(price);
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(Math.Round(exportPrice.PriceRed * (exportProcess[i].SumRed - exportProcess[i].CountRed * 0.075)).ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(9).SetCellValue(price);
                        countMoenyTotal += exportPrice.PriceRed * (exportProcess[i].SumRed - exportProcess[i].CountRed * 0.075);
                        row.GetCell(9).CellStyle = styleBlodWithBorder;

                        //==========================================================================
                        row = excelSheet.CreateRow(count + i * 5 + 2);
                        row.CreateCell(1).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(2).SetCellValue("Kem rớt I");
                        row.GetCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(3).SetCellValue("Xanh dương");
                        row.GetCell(3).CellStyle = styleBlodWithBorderGreen;
                        //
                        row.CreateCell(4).SetCellValue(exportProcess[i].CountGreen);
                        countFruitTotal += exportProcess[i].CountGreen;
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(5).SetCellValue(exportProcess[i].SumGreen);
                        countToCarTotal += exportProcess[i].SumGreen;
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(6).SetCellValue(Math.Round(exportProcess[i].CountGreen * 0.075, 0));
                        countPaperTotal += exportProcess[i].CountGreen * 0.075;
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(7).SetCellValue(Math.Round(exportProcess[i].SumGreen - exportProcess[i].CountGreen * 0.075, 0));
                        countRealTotal += exportProcess[i].SumGreen - exportProcess[i].CountGreen * 0.075;
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(exportPrice.PriceGreen.ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(8).SetCellValue(price);
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(Math.Round(exportPrice.PriceGreen * (exportProcess[i].SumGreen - exportProcess[i].CountGreen * 0.075)).ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(9).SetCellValue(price);
                        countMoenyTotal += exportPrice.PriceGreen * (exportProcess[i].SumGreen - exportProcess[i].CountGreen * 0.075);
                        row.GetCell(9).CellStyle = styleBlodWithBorder;

                        //==========================================================================
                        row = excelSheet.CreateRow(count + i * 5+3);
                        row.CreateCell(1).CellStyle = styleBlodWithBorder;
                        row.CreateCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(3).SetCellValue("Xanh lá");
                        row.GetCell(3).CellStyle = styleBlodWithBorderBlue;
                        //
                        row.CreateCell(4).SetCellValue(exportProcess[i].CountBlue);
                        countFruitTotal += exportProcess[i].CountBlue;
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(5).SetCellValue(exportProcess[i].SumBlue);
                        countToCarTotal += exportProcess[i].SumBlue;
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(6).SetCellValue(Math.Round(exportProcess[i].CountBlue * 0.075, 0));
                        countPaperTotal += exportProcess[i].CountBlue * 0.075;
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(7).SetCellValue(Math.Round(exportProcess[i].SumBlue - exportProcess[i].CountBlue * 0.075, 0));
                        countRealTotal += exportProcess[i].SumBlue - exportProcess[i].CountBlue * 0.075;
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(exportPrice.PriceBlue.ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(8).SetCellValue(price);
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(Math.Round(exportPrice.PriceBlue * (exportProcess[i].SumBlue - exportProcess[i].CountBlue * 0.075)).ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(9).SetCellValue(price);
                        countMoenyTotal += exportPrice.PriceBlue * (exportProcess[i].SumBlue - exportProcess[i].CountBlue * 0.075);
                        row.GetCell(9).CellStyle = styleBlodWithBorder;

                        //==========================================================================
                        var cra = new NPOI.SS.Util.CellRangeAddress(count + i * 5, count + i * 5 + 3,1, 1);
                        excelSheet.AddMergedRegion(cra);

                        var cra2 = new NPOI.SS.Util.CellRangeAddress(count + i * 5, count + i * 5 + 1, 2, 2);
                        excelSheet.AddMergedRegion(cra2);
                        var cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5+2, count + i * 5 + 3, 2, 2);
                        excelSheet.AddMergedRegion(cra3);

                        

                        if(i == exportProcess.Count - 1)
                        {
                            row = excelSheet.CreateRow(count + i * 5 + 4);
                            //
                
                            row.CreateCell(3).CellStyle = styleBlodWithBorder;
                            row.CreateCell(1).CellStyle = styleBlodWithBorder;
                            row.CreateCell(2).CellStyle = styleBlodWithBorder;
                            var cra33 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 4, count + i * 5 + 4, 1, 3);
                            excelSheet.AddMergedRegion(cra33);
                            row.GetCell(1).SetCellValue("TỔNG");
                            //
                            row.CreateCell(4).SetCellValue(countFruitTotal);
                            row.GetCell(4).CellStyle = styleBlodWithBorder;
                            //
                            row.CreateCell(5).SetCellValue(countToCarTotal);
                            row.GetCell(5).CellStyle = styleBlodWithBorder;
                            //
                            row.CreateCell(6).SetCellValue(Math.Round(countPaperTotal,0));
                            row.GetCell(6).CellStyle = styleBlodWithBorder;
                            //
                            row.CreateCell(7).SetCellValue(Math.Round(countRealTotal,0));
                            row.GetCell(7).CellStyle = styleBlodWithBorderYellow;
                            //
                            row.CreateCell(8).CellStyle = styleBlodWithBorder;
                            //
                            price = double.Parse(countMoenyTotal.ToString()).ToString("#,###", cul.NumberFormat);
                            row.CreateCell(9).SetCellValue(price);
                            row.GetCell(9).CellStyle = styleBlodWithBorderYellow;
                            createExportReportDto.TotalNumber = countFruitTotal;
                            createExportReportDto.TotalWeigtToTruck = countToCarTotal;
                            createExportReportDto.TotalPaper = (float)countPaperTotal;
                            createExportReportDto.TotalWeigtReal = (float)countRealTotal;
                            createExportReportDto.TotalMoeny = (float)countMoenyTotal;
                            //==========================================================
                            row = excelSheet.CreateRow(count + i * 5 + 5);
                            //
                      
                            row.CreateCell(3).CellStyle = styleBlodWithBorder;
                            row.CreateCell(1).CellStyle = styleBlodWithBorder;
                            row.CreateCell(2).CellStyle = styleBlodWithBorder;
                            cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 5, count + i * 5 + 5, 1, 3);
                            excelSheet.AddMergedRegion(cra3);
                            row.GetCell(1).SetCellValue("ỨNG XE");
                            //
                            row.CreateCell(4).CellStyle = styleBlodWithBorder;
                            row.CreateCell(5).CellStyle = styleBlodWithBorder;
                            row.CreateCell(6).CellStyle = styleBlodWithBorder;
                            row.CreateCell(7).CellStyle = styleBlodWithBorder;
                            row.CreateCell(8).CellStyle = styleBlodWithBorder;
                            cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 5, count + i * 5 + 5, 4, 8);
                            excelSheet.AddMergedRegion(cra3);
                            //
                            row.CreateCell(9).SetCellValue("30.000.000");
                            row.GetCell(9).CellStyle = styleBlodWithBorder;
                            //==========================================================
                            row = excelSheet.CreateRow(count + i * 5 + 6);
                            //
                     
                            row.CreateCell(3).CellStyle = styleBlodWithBorder;
                            row.CreateCell(1).CellStyle = styleBlodWithBorder;
                            row.CreateCell(2).CellStyle = styleBlodWithBorder;
                            cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 6, count + i * 5 + 6, 1, 3);
                            excelSheet.AddMergedRegion(cra3);
                            row.GetCell(1).SetCellValue("TỔNG THANH TOÁN");
                            //
                            row.CreateCell(4).CellStyle = styleBlodWithBorder;
                            row.CreateCell(5).CellStyle = styleBlodWithBorder;
                            row.CreateCell(6).CellStyle = styleBlodWithBorder;
                            row.CreateCell(7).CellStyle = styleBlodWithBorder;
                            row.CreateCell(8).CellStyle = styleBlodWithBorder;
                            cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 6, count + i * 5 + 6, 4, 8);
                            excelSheet.AddMergedRegion(cra3);
                            //
                            price = double.Parse((countMoenyTotal + 30000000).ToString()).ToString("#,###", cul.NumberFormat);
                            row.CreateCell(9).SetCellValue(price);
                            row.GetCell(9).CellStyle = styleBlodWithBorderTotal;
                            createExportReportDto.TotalPayment = (float)countMoenyTotal + 30000000;
                            createExportReportDto.CarFee = 30000000;
                        }
                    }


                  // lưu lại bản ghi báo cáo
                    ExportReport = createExportReportDto?.Adapt<ExportReport>();
                    ExportReport.Id = Guid.NewGuid().ToString();
                    ExportReport.statusExport = StatusExport.CHUA_XU_LY;
                    var result = await exportReportRepository.UpdateAsync(x => x.Id, ExportReport, true);


                    workbook.Write(memoryStream);

                    return memoryStream.ToArray();
                }
            }
         }

        public async Task<byte[]> ExportReportTwo(DateTime? fromDate, DateTime? toDate, UpdateStatusExportReportDto updateStatusExportReportDto)
        {
            //xử lý tiền dữ liệu
            fromDate = fromDate.Value.AddDays(1);
            toDate = toDate.Value.AddDays(1);
            //====================================
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "ExcelFileTemplate");
            using var memoryStream = new MemoryStream();
            string fileName = @"Report_Export.xlsx";
            // List<ImportProcess> importProcess = await ImportProcessRepository.GetListByIndexAsync(x=>x.DateImport , date.AddDays(1));

            Pageable pageable = new Pageable();
            pageable.PageNumber = 1;
            pageable.PageSize = 1000;
            SearchExportProcessDto searchExportProcessDto = new SearchExportProcessDto();
            searchExportProcessDto.fromDate = fromDate;
            searchExportProcessDto.toDate = toDate;
            var a = await ExportProcessRepository.Search(pageable, searchExportProcessDto);
            List<ExportProcess> exportProcess = (List<ExportProcess>)a.Content;
            if (exportProcess == null)
            {
                return null;
            }
            else
            {
                // --- Below code would create excel file with dummy data----  
                //file.OpenRead();
                using (var fs = new FileStream(Path.Combine(pathToSave, fileName), FileMode.OpenOrCreate, FileAccess.ReadWrite))
                {
                    fs.Position = 0;
                    XSSFWorkbook workbook = new XSSFWorkbook(fs);
                    ISheet excelSheet = workbook.GetSheetAt(0);


                    ICellStyle styleBlodWithBorder = workbook.CreateCellStyle();
                    IFont fontBoldWithBorder = workbook.CreateFont();
                    fontBoldWithBorder.FontName = "Times New Roman";
                    fontBoldWithBorder.FontHeightInPoints = 14;
                    fontBoldWithBorder.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorder.SetFont(fontBoldWithBorder);
                    styleBlodWithBorder.WrapText = true;
                    styleBlodWithBorder.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorder.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorder.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorder.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorder.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorder.BorderBottom = BorderStyle.Thin;
                    //
                    ICellStyle styleBlodWithBorderOrange = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderOrange = workbook.CreateFont();
                    fontBoldWithBorderOrange.FontName = "Times New Roman";
                    fontBoldWithBorderOrange.FontHeightInPoints = 14;
                    fontBoldWithBorderOrange.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderOrange.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderOrange.WrapText = true;
                    styleBlodWithBorderOrange.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderOrange.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderOrange.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderOrange.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderOrange.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderOrange.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderOrange.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderOrange.FillForegroundColor = IndexedColors.LightOrange.Index;
                    //
                    ICellStyle styleBlodWithBorderRed = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderRed = workbook.CreateFont();
                    fontBoldWithBorderRed.FontName = "Times New Roman";
                    fontBoldWithBorderRed.FontHeightInPoints = 14;
                    fontBoldWithBorderRed.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderRed.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderRed.WrapText = true;
                    styleBlodWithBorderRed.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderRed.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderRed.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderRed.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderRed.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderRed.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderRed.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderRed.FillForegroundColor = IndexedColors.Red.Index;

                    //
                    ICellStyle styleBlodWithBorderGreen = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderGreen = workbook.CreateFont();
                    fontBoldWithBorderGreen.FontName = "Times New Roman";
                    fontBoldWithBorderGreen.FontHeightInPoints = 14;
                    fontBoldWithBorderGreen.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderGreen.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderGreen.WrapText = true;
                    styleBlodWithBorderGreen.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderGreen.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderGreen.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderGreen.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderGreen.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderGreen.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderGreen.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderGreen.FillForegroundColor = IndexedColors.LightBlue.Index;
                    //
                    ICellStyle styleBlodWithBorderBlue = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderBlue = workbook.CreateFont();
                    fontBoldWithBorderBlue.FontName = "Times New Roman";
                    fontBoldWithBorderBlue.FontHeightInPoints = 14;
                    fontBoldWithBorderBlue.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderBlue.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderBlue.WrapText = true;
                    styleBlodWithBorderBlue.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderBlue.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderBlue.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderBlue.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderBlue.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderBlue.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderBlue.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderBlue.FillForegroundColor = IndexedColors.Green.Index;
                    //
                    //
                    ICellStyle styleBlodWithBorderYellow = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderYellow = workbook.CreateFont();
                    fontBoldWithBorderYellow.FontName = "Times New Roman";
                    fontBoldWithBorderYellow.FontHeightInPoints = 14;
                    fontBoldWithBorderYellow.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderYellow.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderYellow.WrapText = true;
                    styleBlodWithBorderYellow.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderYellow.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderYellow.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderYellow.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderYellow.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderYellow.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderYellow.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderYellow.FillForegroundColor = IndexedColors.LightYellow.Index;
                    //
                    ICellStyle styleBlodWithBorderTotal = workbook.CreateCellStyle();
                    IFont fontBoldWithBorderTotal = workbook.CreateFont();
                    fontBoldWithBorderTotal.FontName = "Times New Roman";
                    fontBoldWithBorderTotal.FontHeightInPoints = 14;
                    fontBoldWithBorderTotal.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlodWithBorderTotal.SetFont(fontBoldWithBorder);
                    styleBlodWithBorderTotal.WrapText = true;
                    styleBlodWithBorderTotal.VerticalAlignment = VerticalAlignment.Center;
                    styleBlodWithBorderTotal.Alignment = HorizontalAlignment.Center;
                    styleBlodWithBorderTotal.BorderTop = BorderStyle.Thin;
                    styleBlodWithBorderTotal.BorderLeft = BorderStyle.Thin;
                    styleBlodWithBorderTotal.BorderRight = BorderStyle.Thin;
                    styleBlodWithBorderTotal.BorderBottom = BorderStyle.Thin;
                    styleBlodWithBorderTotal.FillPattern = FillPattern.SolidForeground;
                    styleBlodWithBorderTotal.FillForegroundColor = IndexedColors.SkyBlue.Index;
                    //style blod
                    ICellStyle styleBlod = workbook.CreateCellStyle();
                    IFont fontBold = workbook.CreateFont();
                    fontBold.FontName = "Times New Roman";
                    fontBold.FontHeightInPoints = 14;
                    fontBold.Boldweight = (short)FontBoldWeight.Bold;
                    styleBlod.SetFont(fontBold);
                    styleBlod.WrapText = true;
                    styleBlod.Alignment = HorizontalAlignment.Center;
                    styleBlod.VerticalAlignment = VerticalAlignment.Center;

                    int count = 4;
                    IRow row;
                    row = excelSheet.GetRow(0);
                    string? formatted = toDate?.ToString("dd/MM/yyyy");
                    row.CreateCell(2).SetCellValue(formatted);
                    row.GetCell(2).CellStyle = styleBlod;

                    // updateStatusExportReportDto

                    row = excelSheet.GetRow(1);
                    string? formatted2 = DateTime.UtcNow.ToString("dd/MM/yyyy");
                    row.CreateCell(2).SetCellValue(formatted2);
                    row.GetCell(2).CellStyle = styleBlod;

                    row = excelSheet.GetRow(0);
                    row.CreateCell(4).SetCellValue(updateStatusExportReportDto.NameOwner);
                    row.GetCell(4).CellStyle = styleBlod;

                    row = excelSheet.GetRow(1);
                    row.CreateCell(4).SetCellValue(updateStatusExportReportDto.LicenPalates);
                    row.GetCell(4).CellStyle = styleBlod;


                    float countFruitTotal = 0;
                    float countToCarTotal = 0;
                    double countPaperTotal = 0;
                    double countRealTotal = 0;
                    double countMoenyTotal = 0;
                    CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");   // try with "en-US"

                    // khai báo thêm mới báo cáo
                    ExportReport? ExportReport = new ExportReport();
                    CreateExportReportDto createExportReportDto = new CreateExportReportDto();
                    createExportReportDto.FromDate = fromDate;
                    createExportReportDto.ToDate = toDate;

                    for (int i = 0; i < exportProcess.Count; i++)
                    {
                        // lấy thông tin giá
                        SearchExportPriceDto searchExportPriceDto = new SearchExportPriceDto();
                        searchExportPriceDto.fromDate = exportProcess[i].DateExport.AddDays(1);
                        searchExportPriceDto.toDate = exportProcess[i].DateExport.AddDays(1);
                        var b = await exportPriceRepository.Search(pageable, searchExportPriceDto);
                        List<ExportPrice> exportPrices = (List<ExportPrice>)b.Content;
                        ExportPrice exportPrice = new ExportPrice();
                        if (exportPrices != null && exportPrices.Count == 0)
                        {

                            exportPrice.PriceRed = 0;
                            exportPrice.PriceOrange = 0;
                            exportPrice.PriceGreen = 0;
                            exportPrice.PriceBlue = 0;
                        }
                        else
                        {
                            exportPrice = exportPrices[0];
                        }

                        row = excelSheet.CreateRow(count + i * 5);
                        string formatted3 = exportProcess[i].DateExport.ToString("dd/MM/yyyy");
                        row.CreateCell(1).SetCellValue(formatted3);
                        row.GetCell(1).CellStyle = styleBlodWithBorder;

                        //
                        row.CreateCell(2).SetCellValue("Kem rớt II");
                        row.GetCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(3).SetCellValue("Cam");
                        row.GetCell(3).CellStyle = styleBlodWithBorderOrange;
                        //
                        row.CreateCell(4).SetCellValue(exportProcess[i].CountOrange);
                        countFruitTotal += exportProcess[i].CountOrange;
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(5).SetCellValue(exportProcess[i].SumOrange);
                        countToCarTotal += exportProcess[i].SumOrange;
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(6).SetCellValue(Math.Round(exportProcess[i].CountOrange * 0.075, 0));
                        countPaperTotal += exportProcess[i].CountOrange * 0.075;
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(7).SetCellValue(Math.Round(exportProcess[i].SumOrange - exportProcess[i].CountOrange * 0.075, 0));
                        countRealTotal += exportProcess[i].SumOrange - exportProcess[i].CountOrange * 0.075;
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        string price = double.Parse(exportPrice.PriceOrange.ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(8).SetCellValue(price);
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(Math.Round(exportPrice.PriceOrange * (exportProcess[i].SumOrange - exportProcess[i].CountOrange * 0.075)).ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(9).SetCellValue(price);
                        countMoenyTotal += exportPrice.PriceOrange * (exportProcess[i].SumOrange - exportProcess[i].CountOrange * 0.075);
                        row.GetCell(9).CellStyle = styleBlodWithBorder;

                        //==========================================================================
                        row = excelSheet.CreateRow(count + i * 5 + 1);
                        row.CreateCell(1).CellStyle = styleBlodWithBorder;
                        row.CreateCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(3).SetCellValue("Đỏ");
                        row.GetCell(3).CellStyle = styleBlodWithBorderRed;
                        //
                        row.CreateCell(4).SetCellValue(exportProcess[i].CountRed);
                        countFruitTotal += exportProcess[i].CountRed;
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(5).SetCellValue(exportProcess[i].SumRed);
                        countToCarTotal += exportProcess[i].SumRed;
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(6).SetCellValue(Math.Round(exportProcess[i].CountRed * 0.075, 0));
                        countPaperTotal += exportProcess[i].CountRed * 0.075;
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(7).SetCellValue(Math.Round(exportProcess[i].SumRed - exportProcess[i].CountRed * 0.075, 0));
                        countRealTotal += exportProcess[i].SumRed - exportProcess[i].CountRed * 0.075;
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(exportPrice.PriceRed.ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(8).SetCellValue(price);
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(Math.Round(exportPrice.PriceRed * (exportProcess[i].SumRed - exportProcess[i].CountRed * 0.075)).ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(9).SetCellValue(price);
                        countMoenyTotal += exportPrice.PriceRed * (exportProcess[i].SumRed - exportProcess[i].CountRed * 0.075);
                        row.GetCell(9).CellStyle = styleBlodWithBorder;

                        //==========================================================================
                        row = excelSheet.CreateRow(count + i * 5 + 2);
                        row.CreateCell(1).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(2).SetCellValue("Kem rớt I");
                        row.GetCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(3).SetCellValue("Xanh dương");
                        row.GetCell(3).CellStyle = styleBlodWithBorderGreen;
                        //
                        row.CreateCell(4).SetCellValue(exportProcess[i].CountGreen);
                        countFruitTotal += exportProcess[i].CountGreen;
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(5).SetCellValue(exportProcess[i].SumGreen);
                        countToCarTotal += exportProcess[i].SumGreen;
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(6).SetCellValue(Math.Round(exportProcess[i].CountGreen * 0.075, 0));
                        countPaperTotal += exportProcess[i].CountGreen * 0.075;
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(7).SetCellValue(Math.Round(exportProcess[i].SumGreen - exportProcess[i].CountGreen * 0.075, 0));
                        countRealTotal += exportProcess[i].SumGreen - exportProcess[i].CountGreen * 0.075;
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(exportPrice.PriceGreen.ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(8).SetCellValue(price);
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(Math.Round(exportPrice.PriceGreen * (exportProcess[i].SumGreen - exportProcess[i].CountGreen * 0.075)).ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(9).SetCellValue(price);
                        countMoenyTotal += exportPrice.PriceGreen * (exportProcess[i].SumGreen - exportProcess[i].CountGreen * 0.075);
                        row.GetCell(9).CellStyle = styleBlodWithBorder;

                        //==========================================================================
                        row = excelSheet.CreateRow(count + i * 5 + 3);
                        row.CreateCell(1).CellStyle = styleBlodWithBorder;
                        row.CreateCell(2).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(3).SetCellValue("Xanh lá");
                        row.GetCell(3).CellStyle = styleBlodWithBorderBlue;
                        //
                        row.CreateCell(4).SetCellValue(exportProcess[i].CountBlue);
                        countFruitTotal += exportProcess[i].CountBlue;
                        row.GetCell(4).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(5).SetCellValue(exportProcess[i].SumBlue);
                        countToCarTotal += exportProcess[i].SumBlue;
                        row.GetCell(5).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(6).SetCellValue(Math.Round(exportProcess[i].CountBlue * 0.075, 0));
                        countPaperTotal += exportProcess[i].CountBlue * 0.075;
                        row.GetCell(6).CellStyle = styleBlodWithBorder;
                        //
                        row.CreateCell(7).SetCellValue(Math.Round(exportProcess[i].SumBlue - exportProcess[i].CountBlue * 0.075, 0));
                        countRealTotal += exportProcess[i].SumBlue - exportProcess[i].CountBlue * 0.075;
                        row.GetCell(7).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(exportPrice.PriceBlue.ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(8).SetCellValue(price);
                        row.GetCell(8).CellStyle = styleBlodWithBorder;
                        //
                        price = double.Parse(Math.Round(exportPrice.PriceBlue * (exportProcess[i].SumBlue - exportProcess[i].CountBlue * 0.075)).ToString()).ToString("#,###", cul.NumberFormat);
                        row.CreateCell(9).SetCellValue(price);
                        countMoenyTotal += exportPrice.PriceBlue * (exportProcess[i].SumBlue - exportProcess[i].CountBlue * 0.075);
                        row.GetCell(9).CellStyle = styleBlodWithBorder;

                        //==========================================================================
                        var cra = new NPOI.SS.Util.CellRangeAddress(count + i * 5, count + i * 5 + 3, 1, 1);
                        excelSheet.AddMergedRegion(cra);

                        var cra2 = new NPOI.SS.Util.CellRangeAddress(count + i * 5, count + i * 5 + 1, 2, 2);
                        excelSheet.AddMergedRegion(cra2);
                        var cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 2, count + i * 5 + 3, 2, 2);
                        excelSheet.AddMergedRegion(cra3);



                        if (i == exportProcess.Count - 1)
                        {
                            row = excelSheet.CreateRow(count + i * 5 + 4);
                            //

                            row.CreateCell(3).CellStyle = styleBlodWithBorder;
                            row.CreateCell(1).CellStyle = styleBlodWithBorder;
                            row.CreateCell(2).CellStyle = styleBlodWithBorder;
                            var cra33 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 4, count + i * 5 + 4, 1, 3);
                            excelSheet.AddMergedRegion(cra33);
                            row.GetCell(1).SetCellValue("TỔNG");
                            //
                            row.CreateCell(4).SetCellValue(countFruitTotal);
                            row.GetCell(4).CellStyle = styleBlodWithBorder;
                            //
                            row.CreateCell(5).SetCellValue(countToCarTotal);
                            row.GetCell(5).CellStyle = styleBlodWithBorder;
                            //
                            row.CreateCell(6).SetCellValue(Math.Round(countPaperTotal, 0));
                            row.GetCell(6).CellStyle = styleBlodWithBorder;
                            //
                            row.CreateCell(7).SetCellValue(Math.Round(countRealTotal, 0));
                            row.GetCell(7).CellStyle = styleBlodWithBorderYellow;
                            //
                            row.CreateCell(8).CellStyle = styleBlodWithBorder;
                            //
                            price = double.Parse(countMoenyTotal.ToString()).ToString("#,###", cul.NumberFormat);
                            row.CreateCell(9).SetCellValue(price);
                            row.GetCell(9).CellStyle = styleBlodWithBorderYellow;
                            createExportReportDto.TotalNumber = countFruitTotal;
                            createExportReportDto.TotalWeigtToTruck = countToCarTotal;
                            createExportReportDto.TotalPaper = (float)countPaperTotal;
                            createExportReportDto.TotalWeigtReal = (float)countRealTotal;
                            createExportReportDto.TotalMoeny = (float)countMoenyTotal;
                            //==========================================================
                            row = excelSheet.CreateRow(count + i * 5 + 5);
                            //

                            row.CreateCell(3).CellStyle = styleBlodWithBorder;
                            row.CreateCell(1).CellStyle = styleBlodWithBorder;
                            row.CreateCell(2).CellStyle = styleBlodWithBorder;
                            cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 5, count + i * 5 + 5, 1, 3);
                            excelSheet.AddMergedRegion(cra3);
                            row.GetCell(1).SetCellValue("ỨNG XE");
                            //
                            row.CreateCell(4).CellStyle = styleBlodWithBorder;
                            row.CreateCell(5).CellStyle = styleBlodWithBorder;
                            row.CreateCell(6).CellStyle = styleBlodWithBorder;
                            row.CreateCell(7).CellStyle = styleBlodWithBorder;
                            row.CreateCell(8).CellStyle = styleBlodWithBorder;
                            cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 5, count + i * 5 + 5, 4, 8);
                            excelSheet.AddMergedRegion(cra3);
                            //
                            row.CreateCell(9).SetCellValue("30.000.000");
                            row.GetCell(9).CellStyle = styleBlodWithBorder;
                            //==========================================================
                            row = excelSheet.CreateRow(count + i * 5 + 6);
                            //

                            row.CreateCell(3).CellStyle = styleBlodWithBorder;
                            row.CreateCell(1).CellStyle = styleBlodWithBorder;
                            row.CreateCell(2).CellStyle = styleBlodWithBorder;
                            cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 6, count + i * 5 + 6, 1, 3);
                            excelSheet.AddMergedRegion(cra3);
                            row.GetCell(1).SetCellValue("TỔNG THANH TOÁN");
                            //
                            row.CreateCell(4).CellStyle = styleBlodWithBorder;
                            row.CreateCell(5).CellStyle = styleBlodWithBorder;
                            row.CreateCell(6).CellStyle = styleBlodWithBorder;
                            row.CreateCell(7).CellStyle = styleBlodWithBorder;
                            row.CreateCell(8).CellStyle = styleBlodWithBorder;
                            cra3 = new NPOI.SS.Util.CellRangeAddress(count + i * 5 + 6, count + i * 5 + 6, 4, 8);
                            excelSheet.AddMergedRegion(cra3);
                            //
                            price = double.Parse((countMoenyTotal + 30000000).ToString()).ToString("#,###", cul.NumberFormat);
                            row.CreateCell(9).SetCellValue(price);
                            row.GetCell(9).CellStyle = styleBlodWithBorderTotal;
                            createExportReportDto.TotalPayment = (float)countMoenyTotal + 30000000;
                            createExportReportDto.CarFee = 30000000;
                        }
                    }


                    //// lưu lại bản ghi báo cáo
                    //ExportReport = createExportReportDto?.Adapt<ExportReport>();
                    //ExportReport.Id = Guid.NewGuid().ToString();
                    //ExportReport.statusExport = StatusExport.CHUA_XU_LY;
                    //var result = await exportReportRepository.UpdateAsync(x => x.Id, ExportReport, true);


                    workbook.Write(memoryStream);

                    return memoryStream.ToArray();
                }
            }
        }
    }
}