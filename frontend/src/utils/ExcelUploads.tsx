import dayjs from 'dayjs';
import { utils, writeFile } from 'xlsx';

type ReplaceNaming = Record<string, string>;

const camelCaseToTitleCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
};

export function handleDownloadExcel(
  data: readonly object[] | undefined,
  fileName: string,
  userDateFormat: string,
  ignoreValues?: string[],
  keepTheSameNamingCase?: string[],
  replaceNaming?: ReplaceNaming,
) {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }

  const firstItem = data[0];
  const titleCaseHeaders: string[] = [];
  const ignoreColumns: number[] = [];

  Object.keys(firstItem).forEach((item, index) => {
    const keyToPush = replaceNaming && Object.hasOwn(replaceNaming, item)
      ? replaceNaming[item]
      : item;

    if (ignoreValues?.includes(item)) {
      ignoreColumns.push(index);
      return;
    }

    if (keepTheSameNamingCase?.length) {
      const matchingItem = keepTheSameNamingCase.find((value) =>
        value.replace(/\s/g, '').toLowerCase().includes(keyToPush.replace(/\s/g, '').toLowerCase()),
      );

      titleCaseHeaders.push(matchingItem ?? camelCaseToTitleCase(keyToPush));
      return;
    }

    titleCaseHeaders.push(camelCaseToTitleCase(keyToPush));
  });

  const tableData = [
    titleCaseHeaders,
    ...data.map((item) => Object.values(item).filter((_, index) => !ignoreColumns.includes(index))),
  ];

  const worksheet = utils.aoa_to_sheet(tableData);

  if (worksheet['!ref']) {
    const headerRange = utils.decode_range(worksheet['!ref']);

    for (let col = headerRange.s.c; col <= headerRange.e.c; col += 1) {
      const headerCell = utils.encode_cell({ r: 0, c: col });

      if (!worksheet[headerCell].s) {
        worksheet[headerCell].s = {};
      }

      worksheet[headerCell].s.font = { ...worksheet[headerCell].s.font, bold: true };
    }
  }

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Data');
  const excelFileName = `${fileName}_${dayjs().format(`${userDateFormat}_HH-mm`)}.xlsx`;

  writeFile(workbook, excelFileName);
}
